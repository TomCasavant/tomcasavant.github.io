const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

function relativeToInputPath(inputPath, relativeFilePath) {
	let split = inputPath.split("/");
	split.pop();

	return path.resolve(split.join(path.sep), relativeFilePath);

}

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

module.exports = function(eleventyConfig) {
  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths = [600], sizes = '100vw', maxWidth = 1200, maxHeight = 800, fullsize=false) {
    let formats = ["avif", "webp", "auto"];
    let input;
    
    if (isFullUrl(src)) {
      input = src;
    } else {
      input = relativeToInputPath(this.page.inputPath, src);
    }

    let metadata = await eleventyImage(input, {
      widths: widths,
      formats,
      outputDir: path.join(eleventyConfig.dir.output, "img"),
      outputOptions: {
        maxWidth: maxWidth,
        maxHeight: maxHeight,
      },
    });

   let fullSizeMetadata = await eleventyImage(input, {
    widths: ['auto'],
    formats: ['auto'],
    outputDir: path.join(eleventyConfig.dir.output, "img/full"), // Output full-size images to /img/full
  });

 	let classes = 'u-photo visible'
    if (fullsize) {
    	classes = 'visible'
    }
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      class: classes
    };

    let visibleImageHtml = eleventyImage.generateHTML(metadata, imageAttributes);
	let fullSizeSrc = fullSizeMetadata.avif?.[0].url || fullSizeMetadata.webp?.[0].url || fullSizeMetadata.jpeg?.[0].url;
    let result = `<a href="${fullSizeSrc}">${visibleImageHtml}</a>`

    if (fullsize) {
    	let imageAttributes2 = {
      		alt,
      		class: "u-photo notvisible"
    	};
    	let invisibleImageHtml = eleventyImage.generateHTML(fullSizeMetadata, imageAttributes2);
    	result += invisibleImageHtml
    }

    return result;
  });

  // Eleventy img shortcode
  eleventyConfig.addAsyncShortcode("img", async function imgShortcode(src, alt = '') {
    let input;
    
    if (isFullUrl(src)) {
      input = src;
    } else {
      input = relativeToInputPath(this.page.inputPath, src);
    }

    let metadata = await eleventyImage(input, {
      widths: [null],
      formats: ["jpeg"],
      outputDir: path.join(eleventyConfig.dir.output, "img"),
    });

    let fullSizeMetadata = await eleventyImage(input, {
      widths: ['auto'],
      formats: ['auto'],
      outputDir: path.join(eleventyConfig.dir.output, "img"),
    });


    let imageAttributes = {
      alt,
      loading: "lazy",
      decoding: "async",
      class: "visible"
    };
    
    let imageAttributes2 = {
      alt,
      class: "u-photo notvisible"
    };

    let visibleImageHtml = eleventyImage.generateHTML(metadata, imageAttributes);
    let invisibleImageHtml = eleventyImage.generateHTML(fullSizeMetadata, imageAttributes2);
    
    return `${invisibleImageHtml}\n${visibleImageHtml}`;
  });
};
