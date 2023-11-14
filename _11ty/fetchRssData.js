// fetchRssData.js
const fetch = require('node-fetch');
const fs = require('fs').promises;

module.exports = async function() {
  try {
    const url = 'https://tomcasavant.glitch.me/index.xml';
    const response = await fetch(url);
    const xmlData = await response.text();
    await fs.writeFile('./content/_data/rss.xml', xmlData); // Save the XML data to a file
  } catch (error) {
    console.error('Error fetching or saving RSS feed:', error);
  }
};
