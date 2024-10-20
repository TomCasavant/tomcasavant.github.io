const fs = require('fs');
const fetch = require("@11ty/eleventy-fetch");
const unionBy = require('lodash/unionBy');

// Load .env variables with dotenv
require('dotenv').config();

// Define Cache Location and API Endpoint
const CACHE_FILE_PATH = '_webmentioncache/webmentions.json';
const API = 'https://webmention.io/api';
const TOKEN = 'RTDTmj2mw1t8m14tzZPqwA';
let domain = 'tomcasavant.com'
let url = 'https://tomcasavant.com'

async function fetchWebmentions(since, perPage = 10000) {
  // If we don't have a domain name or token, abort
  if (!domain || !TOKEN) {
    console.warn('>>> unable to fetch webmentions: missing domain or token');
    return false;
  }

  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`;
  if (since) url += `&since=${since}`; // only fetch new mentions
  try {
    const response = await fetch(url, {
      duration: "1d", // Cache for a day
      type: "buffer" // Expect buffer
    });
    
    // Convert buffer to JSON
    const feed = JSON.parse(response.toString());
    console.log(feed);
    console.log(`>>> ${feed.children.length} new webmentions fetched from ${API}`);
    return feed;
  } catch (error) {
    console.error('>>> Fetch error:', error);
  }

  return null;
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, 'wm-id');
}

// Save combined webmentions in cache file
function writeToCache(data) {
  const dir = '_cache';
  const fileContent = JSON.stringify(data, null, 2);

  // Create cache folder if it doesn't exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Write data to cache json file
  fs.writeFile(CACHE_FILE_PATH, fileContent, err => {
    if (err) throw err;
    console.log(`>>> webmentions cached to ${CACHE_FILE_PATH}`);
  });
}

// Get cache contents from json file
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH);
    console.log(CACHE_FILE_PATH)
    return JSON.parse(cacheFile);
  }
  console.log(CACHE_FILE_PATH)
  // No cache found.
  console.log("No Cache")
  return {
    lastFetched: null,
    children: []
  };
}

module.exports = async function () {
  console.log('>>> Reading webmentions from cache...');
  const cache = readFromCache();
  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`);
  }

  // Only fetch new mentions in production
  //if (process.env.NODE_ENV === 'production') {
    console.log('>>> Checking for new webmentions...');
    const feed = await fetchWebmentions(cache.lastFetched);
    if (feed) {
      console.log("Feed found")
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed)
      };
      writeToCache(webmentions);
      return webmentions;
    }
  //}

  return cache;
};
