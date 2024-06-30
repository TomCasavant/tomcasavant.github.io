const Parser = require('rss-parser');
const moment = require('moment-timezone');

const parser = new Parser();

// Function to extract text from content
const extractTextFromContent = (content) => {
  if (content) {
    let text = content.replace(/<img[^>]*>/g, '');
    return text;
  }
  return '';
};

// Function to process RSS or Atom feed
const processFeed = (feed, category) => {
  try {
    const posts = feed.items.map(entry => ({
      type: category,
      title: entry.title || null,
      link: entry.link || null,
      description: entry.content || entry.contentSnippet || null,
      pubDate: moment(entry.isoDate || entry.pubDate).tz('America/New_York').format('MMMM Do, YYYY h:mm:ss A'),
      mediaUrl: entry.enclosure ? entry.enclosure.url : null,
      created_at: moment(entry.isoDate || entry.pubDate).toDate()
    }));

    return { posts };
  } catch (error) {
    console.error('Error processing feed:', error);
    return { posts: [] };
  }
};

// Function to fetch and process RSS or Atom feed
async function fetchRSSFeed(url, category) {
  console.log('Fetching RSS data from', url);

  try {
    const feed = await parser.parseURL(url);
    return processFeed(feed, category);
  } catch (error) {
    console.error(`Error fetching or processing RSS data from ${url}:`, error);
    return { posts: [] };
  }
}

module.exports = fetchRSSFeed;
