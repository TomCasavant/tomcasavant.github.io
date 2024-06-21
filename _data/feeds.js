const { parseStringPromise } = require('xml2js');
const moment = require('moment-timezone');


// Function to extract text from content
const extractTextFromContent = (content) => {
  console.log(content._);
  let text = (content._).toString();
  // Remove <img> tag from the content
  text = text.replace(/<img[^>]*>/g, '');

  console.log(text);
  return text;
};


// Function to process RSS feed
const processRssFeed = (json, category) => {
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
  }
  return { posts: [] };
};

// Function to process Atom feed
const processAtomFeed = (json, category) => {
  if (json.feed && json.feed.entry) {
    return {
      posts: json.feed.entry.map(entry => ({
        type: category,
        link: entry.link.find(link => link.$.rel === 'alternate').$.href,
        description: extractTextFromContent(entry.content[0]),
        pubDate: moment(entry.updated[0]).tz('America/New_York').format('MMMM Do, YYYY h:mm:ss A'),
        mediaUrl: entry['media:content'] ? entry['media:content'][0].$.url : null,
        created_at: entry.updated[0]
      }))
    };
  }
  return { posts: [] };
};

// Function to handle both feed types
const processFeed = (json, category) => {
  if (json.rss) {
    return processRssFeed(json, category);
  } else if (json.feed) {
    return processAtomFeed(json, category);
  }
  console.error("Unknown feed format", json);
  return { posts: [] };
};

// Function to fetch and process RSS or Atom feed
async function fetchRSSFeed(url, category) {
  console.log("Fetching RSS data from", url);

  try {
    console.log(url);
    const response = await fetch(url);
    const xml = await response.text();
    const json = await parseStringPromise(xml);

    return processFeed(json, category);
  } catch (error) {
    console.error("Error fetching RSS data:", error);
    return { posts: [] };
  }
}

module.exports = fetchRSSFeed;