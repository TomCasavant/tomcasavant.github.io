const fetchRSSFeed = require('./feeds');

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
  const githubActivities = await require('./github')();
  const fetchRSSFeed = await require('./feeds');
  const microblogPosts = await fetchRSSFeed("https://tomkahe.com/@tom.rss", 'mastodon');
  const musicPosts = simplifyDescriptions(await fetchRSSFeed("https://mastodon.social/@TomsMusic.rss", 'music'));
  console.log(musicPosts);
  const garminActivities = await require('./garmin')();
  const garminRuns = garminActivities.garminRuns
  const garminBiking = garminActivities.garminBiking
  const combined = [...githubActivities.githubActivities, ...microblogPosts.posts, ...garminRuns, ...garminBiking, ...musicPosts.posts]
  const feed = sortFeeds(combined);

  return {
    combinedActivities: feed
  };
};
