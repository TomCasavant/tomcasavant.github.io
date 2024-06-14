function sortFeeds(feed) {
  feed.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return feed;
}

module.exports = async function() {
  console.log("Fetching all Activities")
  const githubActivities = await require('./github')();
  const microblogPosts = await require('./feeds')();
  const garminActivities = await require('./garmin')();
  const garminRuns = garminActivities.garminRuns
  const garminBiking = garminActivities.garminBiking
  console.log("Combining activities")
  console.log(garminRuns)
  const combined = [...githubActivities.githubActivities, ...microblogPosts.posts, ...garminRuns, ...garminBiking]
  const feed = sortFeeds(combined);

  return {
    combinedActivities: feed
  };
};
