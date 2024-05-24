function sortFeeds(feed) {
  feed.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return feed;
}

module.exports = async function() {
  console.log("Fetching all Activities")
  const githubActivities = await require('./github')();
  const microblogPosts = await require('./feeds')();
  console.log("Combining activities")
  console.log(githubActivities)
  const combined = [...githubActivities.githubActivities, ...microblogPosts.posts]
  const feed = sortFeeds(combined);

  return {
    combinedActivities: feed
  };
};
