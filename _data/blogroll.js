const { parseStringPromise } = require('xml2js');
const fs = require('fs').promises;
const path = require('path');
const fetchRSSFeed = require('./feeds');

const jsonFilePath = path.join(__dirname, 'blogroll.json');
const feedsDirectory = path.join(__dirname, 'blogroll-feeds');

// Function to fetch profiles and their RSS feeds
async function fetchProfilesWithFeeds() {
  console.log("Fetching blogroll profiles");
  const json = await fs.readFile(jsonFilePath, 'utf8');
  const profiles = JSON.parse(json);

  const profilesWithFeeds = {};

  // Iterate over profiles and fetch RSS feeds if 'rss' attribute exists
  for (const name in profiles) {
    const details = profiles[name];

    const profilesList = details.profiles.map(async profile => {
      if (profile.rss) {
        const feed = await fetchRSSFeed(profile.rss, profile.type);
        await saveFeedToFile(name, profile.rss, feed.posts); // Save feed with RSS URL as filename

        // Sort posts by 'created_at' in descending order (most recent first)
        const sortedPosts = feed.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        return { ...profile, content: sortedPosts[0] }; // Add content attribute with most recent post
      } else {
        return profile;
      }
    });

    // Wait for all profiles to be processed and sorted
    profilesWithFeeds[name] = {
      tags: details.tags,
      profiles: await Promise.all(profilesList),
    };
  }

  // Sort profilesWithFeeds by most recent post update across all profiles
  const sortedProfilesWithFeeds = {};

  Object.keys(profilesWithFeeds).sort((a, b) => {
    const mostRecentPostA = profilesWithFeeds[a].profiles[0]?.content?.created_at || 0;
    const mostRecentPostB = profilesWithFeeds[b].profiles[0]?.content?.created_at || 0;
    return new Date(mostRecentPostB) - new Date(mostRecentPostA);
  }).forEach(key => {
    sortedProfilesWithFeeds[key] = profilesWithFeeds[key];
  });

  return { blogroll: sortedProfilesWithFeeds };
}


// Function to save feeds to files
async function saveFeedToFile(name, rssUrl, posts) {
  const filename = rssUrl.replace(/[^a-zA-Z0-9]/g, '_') + '.json'; // Ensure a valid filename
  const directory = path.join(feedsDirectory, name);
  /*try {
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, filename), JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error(`Error saving ${rssUrl} feed for ${name}:`, error);
  }*/
}

module.exports = fetchProfilesWithFeeds;
