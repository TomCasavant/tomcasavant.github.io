const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

const moment = require('moment');

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

 async function generateOgImageUrl(photo, inputPath) {
  	  let src = 'photos/' + photo.file;
  	  let input = isFullUrl(src) ? src : relativeToInputPath(inputPath, src);
  	
  	  let metadata = await eleventyImage(input, {
  	    widths: ['auto'],
  	    formats: ['auto'],
  	    outputDir: path.join(eleventyConfig.dir.output, "img"), // Use the output directory
  	  });

  	  console.log(metadata)
  	
  	  return metadata.avif?.[0].url || metadata.webp?.[0].url || metadata.jpeg?.[0].url;	
  };
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
    outputDir: path.join(eleventyConfig.dir.output, "img"), // Output full-size images to /img/full
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
	let fullSizeSrc = fullSizeMetadata.avif?.[0].url || 
	                  fullSizeMetadata.webp?.[0].url || 
	                  fullSizeMetadata.jpeg?.[0].url || 
	                  fullSizeMetadata.png?.[0].url || 
	                  fullSizeMetadata.jpg?.[0].url || 
	                  fullSizeMetadata.gif?.[0].url || 
	                  fullSizeMetadata.svg?.[0].url;
	                  
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

  eleventyConfig.addAsyncShortcode("imgVisibleOnly", async function imgVisibleOnlyShortcode(src, alt = '') {
    let input;
  
    if (isFullUrl(src)) {
      input = src;
    } else {
      input = relativeToInputPath(this.page.inputPath, src);
    }
  
    // Generate only the visible image metadata
    let metadata = await eleventyImage(input, {
      widths: [null],
      formats: ["jpeg"],
      outputDir: path.join(eleventyConfig.dir.output, "img"),
    });
  
    let imageAttributes = {
      alt,
      loading: "lazy",
      decoding: "async",
      class: "visible"
    };
  
    // Generate HTML for visible image only (no invisible image)
    let visibleImageHtml = eleventyImage.generateHTML(metadata, imageAttributes);
  
    return visibleImageHtml;
  });
  

  eleventyConfig.addAsyncShortcode("getImageUrl", async function(src) {
    let input;

    if (isFullUrl(src)) {
      input = src;
    } else {
      input = relativeToInputPath(this.page.inputPath, src);
    }

    let metadata = await eleventyImage(input, {
      widths: [600],
      formats: ["jpeg"],
      outputDir: path.join(eleventyConfig.dir.output, "img"),
    });

    let props = metadata.jpeg[0];
    return props.url;
  });

  	const photography = require("./content/photography/photos.json")
	
	function parseDate(datetime) {
	  return moment(datetime, "YYYY:MM:DD HH:mm:ss").toDate();
	}
	
  eleventyConfig.addCollection("photography", async function(collectionApi) {
    // Populate `photography` array with og_image
    for (let photo of photography) {
      photo.parsedDate = parseDate(photo.datetime);
      photo.og_image = await generateOgImageUrl(photo, './content/photography/');
    }

    // Sort photos by date
    const sortedPhotography = photography.sort((a, b) => b.parsedDate - a.parsedDate);

    return sortedPhotography;
  });
};
