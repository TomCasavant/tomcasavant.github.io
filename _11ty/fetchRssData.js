// generateRssHtml.js
const fetch = require('node-fetch');

async function generateRssHtml() {
  try {
    const url = 'https://tomcasavant.glitch.me/index.xml';
    const response = await fetch(url);
    const rssData = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssData, 'text/xml');

    let html = '<div class="feed">';
    html += `<h1>${xmlDoc.querySelector('title').textContent}</h1>`;
    html += `<p><strong>Updated:</strong> ${xmlDoc.querySelector('updated').textContent}</p>`;
    html += `<p><strong>Author:</strong> ${xmlDoc.querySelector('author name').textContent}</p>`;

    const entries = xmlDoc.querySelectorAll('entry');
    entries.forEach((entry) => {
      html += '<div class="entry">';
      html += `<h2>${entry.querySelector('title').textContent}</h2>`;
      html += `<p><strong>Updated:</strong> ${entry.querySelector('updated').textContent}</p>`;
      html += `<p>${entry.querySelector('summary').textContent}</p>`;
      
      html += '<p><strong>Categories:</strong>';
      const categories = entry.querySelectorAll('category');
      categories.forEach((category, index) => {
        html += `${category.getAttribute('term')}`;
        if (index !== categories.length - 1) {
          html += ', ';
        }
      });
      html += '</p>';
      
      html += '</div>';
    });

    html += '</div>';
    return html;
  } catch (error) {
    console.error('Error fetching or processing RSS data:', error);
    return '<p>No RSS data available.</p>';
  }
}

module.exports = generateRssHtml;
