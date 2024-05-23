const { parseStringPromise } = require('xml2js');
const moment = require('moment-timezone');

module.exports = async function() {
  console.log("Fetching Microblog data");

  // Use dynamic import for node-fetch
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

  try {
    const response = await fetch("https://tomkahe.com/@tom.rss");
    const xml = await response.text();
    const json = await parseStringPromise(xml);
    
    // Ensure the structure is as expected before accessing properties
    if (json.rss && json.rss.channel && json.rss.channel[0] && json.rss.channel[0].item) {
      return {
        posts: json.rss.channel[0].item.map(entry => ({
          link: entry.link[0],
          description: entry.description[0],
          pubDate: moment(entry.pubDate[0]).tz('America/New_York').format('MMMM Do, YYYY h:mm:ss A'),
          mediaUrl: entry['media:content'] ? entry['media:content'][0].$.url : null
        }))
      };
    } else {
      console.error("Unexpected XML structure", json);
      return {
        posts: []
      };
    }
  } catch (error) {
    console.error("Error fetching Mastodon data:", error);
    return {
      posts: []
    };
  }
};
