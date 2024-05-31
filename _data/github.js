const { Octokit } = require('@octokit/rest');
const moment = require('moment-timezone');
require('dotenv').config();


const octokit = new Octokit({
  auth: process.env.GIT_TOKEN,
});

async function getStarredRepos(username) {
  try {
    const response = await octokit.activity.listReposStarredByUser({
      username: username,
      per_page: 10, // Number of repositories to fetch
      sort: 'created', // Sort by when the star was created
      direction: 'desc', // Get the most recent first
      mediaType: {
      	format: 'star'
      }
    });

    console.log(response.data)

    return response.data.map(star => ({
      type: 'github',
      name: star.repo.full_name,
      link: star.repo.html_url,
      created_at: star.starred_at,
      description: `Tom starred ${star.repo.full_name}`,
      pubDate: moment(star.starred_at).tz('America/New_York').format('MMMM Do, YYYY h:mm:ss A')
    }));
  } catch (error) {
    console.error(`Error fetching starred repositories: ${error}`);
    return [];
  }
}

async function getUserIssues() {
  try {
    const response = await octokit.rest.issues.listForAuthenticatedUser({});

    console.log('Response Status:', response.status);
    console.log('Request URL:', response.url);
    console.log('Response Data:', response.data);

    return response.data.map(item => {
      let type = item.pull_request ? 'pull_request' : 'issue';
      return {
        type: 'github',
        itemType: type,
        title: item.title,
        repo: item.repository.full_name,
        link: item.html_url,
        created_at: item.created_at,
        pubDate: moment(item.created_at).tz('America/New_York').format('MMMM Do, YYYY h:mm:ss A'),
        description: `Tom created a ${type.replace('_', ' ')} in ${item.repository.full_name}: ${item.title}`
      };
    });
  } catch (error) {
    console.error(`Error fetching issues: ${error}`);
    return [];
  }
}



module.exports = async function () {
	console.log("Fetching Github data")
	let activities;
	let starredRepos = [];
	let userIssues = [];

	try {
		starredRepos = await getStarredRepos("TomCasavant");
		userIssues = await getUserIssues();
	} catch (error) {
		console.error("Failed to grab github data");
	}

	const combined = [...starredRepos, ...userIssues];
	combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
	console.log(combined);
	return {
		githubActivities: combined
	};
}
