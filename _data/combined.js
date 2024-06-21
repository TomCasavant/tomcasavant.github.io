const fetchRSSFeed = require('./feeds');
const getGithubActivities = require('./github')
const getGarminActivities = require('./garmin');
const getBookmarks = require('./bookmarks');

function sortFeeds(feed) {
  feed.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return feed;
}

function simplifyDescriptions(musicPosts) {
  musicPosts.posts.forEach(post => {
    // Extract the song name and Spotify URL from the description
    const descriptionMatch = post.description.match(/listening to ([^<]+)<br\s?\/>\s?<a href="([^"]+)"/);
    if (descriptionMatch) {
      const songName = descriptionMatch[1];
      const spotifyUrl = descriptionMatch[2];
      // Modify the description
      post.description = `Tom listened to <a href="${spotifyUrl}" target="_blank" rel="nofollow noopener noreferrer">${songName}</a>`;
    }
  });
  return musicPosts;
}

module.exports = async function() {
  console.log("Fetching all Activities")
  const githubFetch = await getGithubActivities();
  
  const bookmarks = await getBookmarks();
  const githubActivities = githubFetch.githubActivities;
  const microblogPosts = await fetchRSSFeed("https://tomkahe.com/@tom.rss", 'mastodon');
  const pixelfedPosts = await fetchRSSFeed("https://pixelfed.social/users/mrpresidenttom.atom", 'pixelfed');
  const musicPosts = simplifyDescriptions(await fetchRSSFeed("https://mastodon.social/@TomsMusic.rss", 'music'));
  //console.log(microblogPosts.posts);
  console.log(bookmarks);
  const garminActivities = await getGarminActivities();
  const garminRuns = garminActivities.garminRuns
  const garminBiking = garminActivities.garminBiking
  const garminWalking = garminActivities.garminWalking

  const combined = [...githubActivities, ...microblogPosts.posts, ...pixelfedPosts.posts, ...garminRuns, ...garminBiking, ...musicPosts.posts, ...garminWalking, ...bookmarks.bookmarks]
  const feed = sortFeeds(combined);

  return {
    combinedActivities: feed,
    garminRuns: garminRuns,
    garminBiking: garminBiking,
    garminWalking: garminWalking,
    githubActivities: githubActivities,
    bookmarks: bookmarks,
  };
};
