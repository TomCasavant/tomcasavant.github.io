const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const sanitizeHtml = require("sanitize-html");
const slugify = require("slugify");
const moment = require("moment");
const filters = require("./_11ty/filters");
const foodImages = require("./content/food/images.json");

// Local plugins
const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

// Helper: Dynamic import with fallback for default or named export
const dynamicImport = async (pkg) =>
  await import(pkg).then((m) => m.default || m);

module.exports = async function (eleventyConfig) {

  const { HtmlBasePlugin } = await import("@11ty/eleventy");
  
  // Passthrough copies
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
    "./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css",
    "CNAME": "CNAME",
    "content/subscriptions.opml": "subscriptions.opml",
    "src/well-known": ".well-known",
  });

  // Watch content images
  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

  // Add filters
  Object.entries(filters).forEach(([name, fn]) => {
    eleventyConfig.addFilter(name, fn);
  });

  eleventyConfig.addFilter("splitPath", (value) =>
    value.split("/").pop().split(".")[0]
  );

  eleventyConfig.addFilter("sanitize", (content) =>
    sanitizeHtml(content, {
      allowedTags: [],
      allowedAttributes: {},
    })
  );

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) =>
    DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "dd LLLL yyyy"
    )
  );

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  );

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) return [];
    return n < 0 ? array.slice(n) : array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => Math.min(...numbers));

  eleventyConfig.addFilter("getAllTags", (collection) => {
    const tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return [...tagSet];
  });

  eleventyConfig.addFilter("filterTagList", (tags) =>
    (tags || []).filter((tag) => !["all", "nav", "post", "posts"].includes(tag))
  );

  // Shortcodes
  eleventyConfig.addShortcode("currentBuildDate", () => new Date().toISOString());

  // Collections
  eleventyConfig.addCollection("foodImages", () =>
    foodImages.sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  // Markdown anchor config
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "header-anchor",
        symbol: "#",
        ariaHidden: false,
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter("slugify") || slugify,
    });
  });

  // Load official plugins (via dynamic import)
  const [
    pluginRss,
    pluginSyntaxHighlight,
    pluginNavigation,
    pluginBundle,
    eleventyGoogleFonts,
  ] = await Promise.all([
    dynamicImport("@11ty/eleventy-plugin-rss"),
    dynamicImport("@11ty/eleventy-plugin-syntaxhighlight"),
    dynamicImport("@11ty/eleventy-navigation"),
    dynamicImport("@11ty/eleventy-plugin-bundle"),
    dynamicImport("eleventy-google-fonts"),
  ]);

  eleventyConfig.addPlugin(pluginRss, {
    type: "atom",
    outputPath: "/blog.xml",
    collection: { name: "posts", limit: 0 },
    metadata: {
      language: "en",
      title: "Tom Casavant",
      subtitle: "Blog about things.",
      base: "https://tomcasavant.com/",
      author: {
        name: "Tom Casavant",
        email: "tfcasavant@gmail.com",
      },
    },
  });

  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(pluginDrafts);
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(eleventyGoogleFonts);

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "dist",
    },
    permalink: "/{{ title | slug }}/",
    pathPrefix: "/",
  };
};
