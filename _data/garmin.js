// Require necessary packages
const { GarminConnect } = require('garmin-connect');
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, 'garminActivities.json');

// Initialize Garmin Connect client
const GCClient = new GarminConnect({
    username: process.env.GARMIN_EMAIL,
    password: process.env.GARMIN_PASSWORD
});

// Function to fetch recent activities
async function fetchActivities() {
    console.log("Fetching Garmin activities");
    try {
        // Login to Garmin Connect
        await GCClient.login();

        // Fetch recent activities
        const activities = await GCClient.getActivities();

        // Save activities to a JSON file
        await fs.writeFile(jsonFilePath, JSON.stringify(activities));

        return activities;
    } catch (error) {
        throw error;
    }
}

function formatDate(dateString) {
	const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    console.log(`${day}-${month}-${year}`)
    return `${month}-${day}-${year}`;
}

function formatDistance(distanceInMeters) {
    const distanceInMiles = distanceInMeters / 1609.344; // 1 mile is approximately 1609.344 meters
    console.log(distanceInMiles.toFixed(2));
    return distanceInMiles.toFixed(2); // Round to 2 decimal places
}

function formatDuration(durationInSeconds) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = (durationInSeconds % 60).toFixed(0);

    const hoursString = hours === 0 ? '' : `${hours}:`;
    const minutesString = `${minutes}`.padStart(2, '0');
    const secondsString = `${seconds}`.padStart(2, '0');

    return `${hoursString}${minutesString}:${secondsString}`;
}


function formatSpeedMPH(averageSpeed) {
    const metersPerSecondToMilesPerHour = 2.23694; // 1 m/s is approximately 2.23694 mph
    const speedInMph = averageSpeed * metersPerSecondToMilesPerHour;
    return speedInMph.toFixed(2); // Round to 2 decimal places
}

function formatSpeed(averageSpeed) {
    const metersPerSecondToMinutesPerMile = 26.8224; // 1 m/s is approximately 26.8224 minutes per mile
    const speedInMinutesPerMile = metersPerSecondToMinutesPerMile / averageSpeed;
    const minutes = Math.floor(speedInMinutesPerMile);
    const seconds = Math.round((speedInMinutesPerMile - minutes) * 60);
    if (minutes <= 1) {
    	return null
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Format as MM:SS
}


module.exports = async function () {
    let activities;

    try {
        // Attempt to fetch activities from Garmin Connect
        activities = await fetchActivities();
    } catch (error) {
        console.error('Error fetching activities from Garmin Connect');
    }

    if (!activities) {
        try {
            // If fetching from Garmin Connect failed, try to use the JSON file as a fallback
            console.log('Using cached Garmin activities');
            const json = await fs.readFile(jsonFilePath, 'utf8');
            activities = JSON.parse(json);
        } catch (error) {
            console.error('Error reading cached activities:', error);
            activities = [];
        }
    }


    const indoorCyclingActivities = activities.filter(activity => activity.activityType.typeKey === 'indoor_cycling');
    const runningActivities = activities.filter(activity => activity.activityType.typeKey === 'running');


    // Map the activities to a simpler format
    const formattedRunningActivities = runningActivities.map(activity => ({
        name: activity.activityName,
        date: formatDate(activity.startTimeLocal),
        distance: formatDistance(activity.distance),
        duration: formatDuration(activity.duration),
        speed: formatSpeed(activity.averageSpeed),
        type: activity.activityType.typeKey,
        maxSpeed: formatSpeed(activity.maxSpeed)
    }));

       // Map the activities to a simpler format
    const formattedBikingActivities = indoorCyclingActivities.map(activity => ({
        name: activity.activityName,
        date: formatDate(activity.startTimeLocal),
        distance: formatDistance(activity.distance),
        duration: formatDuration(activity.duration),
        speed: formatSpeedMPH(activity.averageSpeed),
        type: activity.activityType.typeKey
    }));

    return {
        garminRuns: formattedRunningActivities,
        garminBiking: formattedBikingActivities
    };
};
