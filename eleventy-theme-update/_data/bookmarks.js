const { parseStringPromise } = require('xml2js');

module.exports = async function() {
  console.log("Fetching Postmarks data");

  // Use dynamic import for node-fetch
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

  try {
    const response = await fetch("https://tomcasavant.glitch.me/index.xml");
    const xml = await response.text();
    const json = await parseStringPromise(xml);
    
    // Ensure the structure is as expected before accessing properties
    if (json.feed && json.feed.entry) {
      return {
        bookmarks: json.feed.entry.map(entry => ({
          title: entry.title,
          link: entry.link[0].$.href,
          id: entry.id,
          updated: entry.updated,
          summary: entry.summary[0]._
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
