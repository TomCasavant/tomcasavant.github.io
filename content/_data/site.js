const isDev = process.env.ELEVENTY_ENV === 'development';

const baseUrl = isDev ? `localhost:8080` : `https://www.tomcasavant.com/`;

const site = {
  title: 'My site title',
  description: 'My site description',
  baseUrl,
}

module.exports = site;
