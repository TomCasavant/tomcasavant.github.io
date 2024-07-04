const { DateTime } = require('luxon');
const moment = require('moment');

module.exports = {
    getWebmentionsForUrl: (webmentions, url) => {
        return webmentions.children
            .filter(entry => entry['wm-target'] === url)
            .sort((a, b) => new Date(a.published) - new Date(b.published));
    },
    size: (mentions) => {
        return !mentions ? 0 : mentions.length;
    },
    webmentionsByType: (mentions, mentionType) => {
        return mentions.filter(entry => !!entry[mentionType]);
    },
    readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
        return DateTime.fromISO(dateStr).toFormat(formatStr);
    },
    readableDateTimeFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
        return DateTime.fromISO(dateStr).toFormat(formatStr);
    },
    formatDate: (dateString) => {
        const date = moment(dateString, "YYYY:MM:DD HH:mm:ss");
        if (!date.isValid()) {
            return dateString; // Return original string if date is invalid
        }
        return date.format('MMMM Do, YYYY h:mm A');
    },
    formatExposureTime: (exposureTime) => {
        const time = parseFloat(exposureTime);
        if (time < 1) {
            return `1/${Math.round(1 / time)}`;
        }
        return time.toString();
    }
};
