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
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths = [600], sizes='100vw', maxWidth=1200, maxHeight=800) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		let formats = ["avif", "webp", "auto"];
		let input;
		if(isFullUrl(src)) {
			input = src;
		} else {
			input = relativeToInputPath(this.page.inputPath, src);
		}

		let metadata = await eleventyImage(input, {
			widths: widths,
			formats,
			outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
			outputOptions: {
				maxWidth: maxWidth,
				maxHeight: maxHeight,
			},
		});

		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		return eleventyImage.generateHTML(metadata, imageAttributes);
	});

	eleventyConfig.addAsyncShortcode("img", async function imgShortcode(src, alt = '') {
		let input;
		if (isFullUrl(src)) {
		  input = src;
		} else {
		  input = relativeToInputPath(this.page.inputPath, src);
		}
	
		let metadata = await eleventyImage(input, {
		  widths: [null], // Adjust width as needed
		  formats: ["jpeg"], // Adjust formats as needed
		  outputDir: path.join(eleventyConfig.dir.output, "img"),
		});
	
		// Get the URL of the processed image
		let imgSrc = metadata.jpeg[0].url; // Adjust based on your formats
	
		return `<img src="${imgSrc}" alt="${alt}">`;
	  });
};