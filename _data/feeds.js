const { parseStringPromise } = require('xml2js');
const moment = require('moment-timezone');


async function fetchRSSFeed(url, category) {
  console.log("Fetching RSS data from", url);

  try {
    const response = await fetch(url);
    const xml = await response.text();
    const json = await parseStringPromise(xml);

    // Ensure the structure is as expected before accessing properties
    if (json.rss && json.rss.channel && json.rss.channel[0] && json.rss.channel[0].item) {
      return {
        posts: json.rss.channel[0].item.map(entry => ({
          type: category,
          link: entry.link[0],
          description: entry.description[0],
          pubDate: moment(entry.pubDate[0]).tz('America/New_York').format('MMMM Do, YYYY h:mm:ss A'),
          mediaUrl: entry['media:content'] ? entry['media:content'][0].$.url : null,
          created_at: entry.pubDate[0]
        }))
      };
    } else {
      console.error("Unexpected XML structure", json);
      return {
        posts: []
      };
    }
  } catch (error) {
    console.error("Error fetching RSS data:", error);
    return {
      posts: []
    };
  }
}

module.exports = fetchRSSFeed
  //console.log("Fetching Microblog data");
  //const tom = await fetchRSSFeed("https://tomkahe.com/@tom.rss")
