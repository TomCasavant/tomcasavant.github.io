const { parseStringPromise } = require('xml2js');
const moment = require('moment-timezone');

async function getBookmarks() {
  console.log("Fetching Postmarks data");

  // Use dynamic import for node-fetch
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

  try {
    const response = await fetch("https://bookmarks.tomkahe.com/index.xml");
    const xml = await response.text();
    const json = await parseStringPromise(xml);
    
    // Ensure the structure is as expected before accessing properties
    if (json.feed && json.feed.entry) {
      return {
        bookmarks: json.feed.entry.map(entry => ({
          type: 'bookmark',
          title: entry.title,
          url: entry.link[0].$.href,
          link: entry.id,
          id: entry.id,
          created_at: entry.updated,
          summary: entry.summary[0]._,
          pubDate: moment(new Date(entry.updated)).tz('America/New_York').format('MMMM Do, YYYY h:mm:ss A'),
          description: `Tom bookmarked <a href='${entry.link[0].$.href}'>${entry.title}</a>. <blockquote>\n\n${entry.summary[0]._} </blockquote>`
        }))
      };
    } else {
      console.error("Unexpected XML structure", json);
      return {
        bookmarks: []
      };
    }
  } catch (error) {
    console.error("Error fetching Postmarks data:", error);
    return {
      bookmarks: []
    };
  }
};

module.exports = getBookmarks
