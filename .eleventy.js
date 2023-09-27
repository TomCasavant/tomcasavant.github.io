const { format, formatISO, getYear } = require("date-fns");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginToc = require("eleventy-plugin-toc");
const { MD5 } = require("crypto-js");
const { URL } = require("url");
const { readFileSync } = require("fs");
const siteconfig = require("./content/_data/siteconfig.js");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const nunjucksDate = require("nunjucks-date-filter");
const Webmentions = require("eleventy-plugin-webmentions");

module.exports = function (eleventyConfig) {
    // Set Markdown library
    eleventyConfig.setLibrary(
        "md",
        markdownIt({
            html: true,
            xhtmlOut: true,
            linkify: true,
            typographer: true
        }).use(markdownItAnchor)
    );

     eleventyConfig.addPassthroughCopy('.well-known/webfinger');

    // Define passthrough for assets
    eleventyConfig.addPassthroughCopy("assets");

    // Add watch target for JS files (needed for JS bundling in dev mode)
    eleventyConfig.addWatchTarget("./assets/js/");
    // And to make this work we've to disable the .gitignore usage of eleventy.
    eleventyConfig.setUseGitIgnore(false);

    // Add 3rd party plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginToc);

    // Define 11ty template formats
    eleventyConfig.setTemplateFormats([
        "njk",
        "md",
        "svg",
        "jpg",
        "css",
        "png"
    ]);

    // Generate excerpt from first paragraph
    eleventyConfig.addShortcode("excerpt", (article) =>
        extractExcerpt(article)
    );

    // Set absolute url
    eleventyConfig.addNunjucksFilter("absoluteUrl", (path) => {
        return new URL(path, siteconfig.url).toString();
    });

    // Extract reading time
    eleventyConfig.addNunjucksFilter("readingTime", (wordcount) => {
        let readingTime = Math.ceil(wordcount / 220);
        if (readingTime === 1) {
            return readingTime + " minute";
        }
        return readingTime + " minutes";
    });

    // Extract word count
    eleventyConfig.addNunjucksFilter("formatWords", (wordcount) => {
        return wordcount.toLocaleString("en");
    });

  eleventyConfig.addFilter("date", nunjucksDate);

    // Returns CSS class for home page link
    eleventyConfig.addNunjucksFilter("isHomeLink", function (url, pattern) {
        return (pattern === "/" && url === "/") ||
            (pattern === "/" && url.startsWith("/posts"))
            ? "active"
            : "";
    });

    // Returns CSS class for active page link
    eleventyConfig.addNunjucksFilter("isActiveLink", function (url, pattern) {
        return url.length > 1 && url.startsWith(pattern) ? "active" : "";
    });

    // Format dates for sitemap
    eleventyConfig.addNunjucksFilter("sitemapdate", function (date) {
        return format(date, "yyyy-MM-dd");
    });

    // Format dates for JSON-LD
    eleventyConfig.addNunjucksFilter("isodate", function (date) {
        return formatISO(date);
    });

    // Extracts the year from a post
    eleventyConfig.addNunjucksFilter("year", function (post) {
        if (post && post.date) {
            return getYear(post.date);
        }
        return "n/a";
    });

    // Extracts the day of a date
    eleventyConfig.addNunjucksFilter("day", function (date) {
        return format(date, "dd");
    });

    // Extracts the month of a date
    eleventyConfig.addNunjucksFilter("month", function (date) {
        return format(date, "MMM");
    });

    // Extracts readable date of a date
    eleventyConfig.addNunjucksFilter("readableDate", function (date) {
        return format(date, "MMM dd, yyyy");
    });

    // Add custom hash for cache busting
    const hashes = new Map();
    eleventyConfig.addNunjucksFilter("addHash", function (absolutePath) {
        const cached = hashes.get(absolutePath);
        if (cached) {
            return `${absolutePath}?hash=${cached}`;
        }
        const fileContent = readFileSync(`${process.cwd()}${absolutePath}`, {
            encoding: "utf-8"
        }).toString();
        const hash = MD5(fileContent.toString());
        hashes.set(absolutePath, hash);
        return `${absolutePath}?hash=${hash}`;
    });

    // Create custom collection for getting the newest 5 updates
    eleventyConfig.addCollection("recents", function (collectionApi) {
        return collectionApi.getAllSorted().reverse().slice(0, 5);
    });

    // Plugin for setting _blank and rel=noopener on external links in markdown content
    eleventyConfig.addPlugin(require("./_11ty/external-links.js"));

    // Plugin for transforming images
    eleventyConfig.addPlugin(require("./_11ty/srcset.js"));

    // Plugin for minifying HTML
    eleventyConfig.addPlugin(require("./_11ty/html-minify.js"));

    eleventyConfig.addPlugin(Webmentions, {
      domain: "tomcasavant.com",
      token: "RTDTmj2mw1t8m14tzZPqwA",
    });
    
    eleventyConfig.addPassthroughCopy("CNAME")

    return {
        dir: {
            // Consolidating everything below the `content` folder
            input: "content",
            output: "dist"
        }
    };
};

// Taken from here => https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
function extractExcerpt(article) {
    if (!Object.prototype.hasOwnProperty.call(article, "templateContent")) {
        console.warn(
            'Failed to extract excerpt: Document has no property "templateContent".'
        );
        return "No Description";
    }

    const content = article.templateContent;
    if(content.indexOf("\n") > -1){
      const excerpt = content.slice(0, content.indexOf("\n")).toString();
      //const excerpt = content.indexOf("\n").toString()
      return excerpt;
    } else {
      return "No Description"
    }
}
