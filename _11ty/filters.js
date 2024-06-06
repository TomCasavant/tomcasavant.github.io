const { DateTime } = require('luxon');

module.exports = {
    getWebmentionsForUrl: (webmentions, url) => {
        return webmentions.children
            .filter(entry => entry['wm-target'] === url)
            .sort((a, b) => new Date(a.published) - new Date(b.published));
    },
    size: (mentions) => {
        return !mentions ? 0 : mentions.length
    },
    webmentionsByType: (mentions, mentionType) => {
        return mentions.filter(entry => !!entry[mentionType])
    },
    readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
        return DateTime.fromISO(dateStr).toFormat(formatStr);
    },
    readableDateTimeFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    	return DateTime.fromISO(dateStr).toFormat(formatStr);
 	},
}
