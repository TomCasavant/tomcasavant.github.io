---
layout: layouts/base.njk
title: Feeds
eleventyNavigation:
  key: Feeds
  order: 3
---

<section>
  <div class="box2 box">
    <div class="content">
      <div class="row">
        <div class="image">
          <img src="https://s3.us-east-2.amazonaws.com/takahe/accounts/avatars/111/586/164/979/249/096/original/a5c0de9b43b5a4ff.jpg" alt="Profile Image">
        </div>
        <div class="post">
          <p>Post</p>
          <h5>28</h5>
        </div>
        <div class="followers">
          <p>Followers</p>
          <h5>678</h5>
        </div>
        <div class="following">
          <p>Following</p>
          <h5>120</h5>
        </div>
      </div>
      <div class="text">
        <p class="name">Tom Casavant</p>
        <p class="job_title">Sofware Developer</p>
        <p class="about">About</p>
        <p class="job_discription"></p>
      </div>
    </div>
  </div>
  {% for post in combined.combinedActivities %}
	<div class="box2 box">
		<p class="icon {{ post.type }}">  </p>
		<div class="row post-info">
			<!-- <p class="post-username">@tom@tomkahe.com</p> 
			<p class="post-time">4h</p>-->
		</div>
		<p class="post-content">{{ post.description | safe }}</p>
		<a href={{ post.link }}> Source </a>
		<p class="post-date">{{ post.pubDate }}</p>
	</div>
  {% endfor %}
</section>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
}

:root {
  --green: #58a497;
  --yellow: #e09449;
  --lightgreen1: #a4bdb7;
  --brown: #8b4448;
  --gray: gray;
  --lightgreen2: rgb(164, 189, 183, 0.5);
  --box: #ededed;
}

main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

/* Content-1:Start */
.box {
  width: 350px;
  height: fit-content;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
  background: var(--background-standout);
}

.box1 {
  margin-top: 10px;
}

.content {
  margin: 15px 2px;
}

.image img {
  height: auto;
  width: 120px;
  border-radius: 50%;

  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
}

.level {
  font-size: 0.7em;
  background-color: rgb(164, 189, 183, 0.5);
  width: 50px;
  padding: 3px;
  border-radius: 5px;
  font-weight: bolder;
  letter-spacing: 1px;

  display: block;
  margin: 0px auto 10px;
}

.name {
  font-size: 1.25em;
  font-weight: bolder;
  letter-spacing: 1px;
}

.job_title {
  font-size: 0.65em;
  font-weight: bolder;
  color: gray;
  margin-top: -2px;
}

.job_discription {
  font-size: 0.7em;
  color: gray;
  margin: 10px 30px 20px;
}

.icons {
  margin: 0px 30px;
  font-size: 1.5em;
  display: flex;
  justify-content: space-around;
}

.icons button {
  width: fit-content;
  height: fit-content;
  border: none;
  font-size: 1em;
}

ion-icon:hover {
  color: #58a497;
  transition: 0.5s;
}

button {
  width: 130px;
  height: 40px;
  border-radius: 10px;
  font-weight: bolder;
}

.button {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin: 20px 30px 0px;
}

.button .message {
  background: #ededed;
  border: 2px solid #000;
}

.button .connect {
  background-color: #000;
  color: #ededed;
  border: none;
}
button.connect:hover {
  letter-spacing: 1px;
  transition: 0.5s;
}
button.message:hover {
  letter-spacing: 1px;
  transition: 0.5s;
  background: rgba(88, 164, 151, 0.5);
}
/* Content-1:End */

/* Content-2:Start */
.box2 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.box2 img {
  width: 80px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 10px;
}

h5 {
  font-weight: bolder;
  font-size: 1em;
}

.row p {
  font-size: 0.8em;
}

.box2 .text {
  text-align: left;
}

.box2 .text .name {
  font-size: 1.1em;
}

.box2 .text .job_title {
  font-size: 0.6em;
  margin-bottom: 10px;
}

.box2 .text .job_discription {
  margin: 0px;
}

.box2 .text .about {
  font-size: 0.9em;
  font-weight: bolder;
}
/* Content-2:End */

/* Responsiveness:Start */
@media screen and (max-width: 480px) {
    .box{
        width: 100vw;
        border-radius: 0px;
    }
    .button{
        display: flex;
        flex-direction: column;
    }
    .button button{
        width: 250px;
    }
    button.connect{
        margin-top: 10px;
    }
    .content2{
        padding: 0px 20px;
    }
    .content2 img{
        width: 60px;
        height: 60px;
    }
}
/* Responsiveness:End */

.post-info {
  font-size: 0.7em;
  text-align: left;
  font-weight: bolder;
}

.post-date {
  font-size: 0.45em;
  text-align: right;
  
}

.post-content {
  font-size: 0.75em;
  text-align: left;
  padding: 10px;
}

.post-logo {
  text-align: right;
}

.mastodon {
    display: inline-block;
    width: 1.75em; /* Adjust as needed */
    height: 1.75em; /* Adjust as needed */
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>Mastodon icon</title><path d="M 15.659 9.592 C 15.424 10.72 13.553 11.956 11.404 12.195 C 10.283 12.32 9.18 12.434 8.003 12.384 C 6.079 12.302 4.56 11.956 4.56 11.956 C 4.56 12.13 4.572 12.297 4.595 12.452 C 4.845 14.224 6.478 14.33 8.025 14.379 C 9.586 14.429 10.976 14.02 10.976 14.02 L 11.04 15.337 C 11.04 15.337 9.948 15.884 8.003 15.984 C 6.93 16.039 5.598 15.959 4.047 15.576 C 0.683 14.746 0.104 11.4 0.015 8.006 C -0.012 6.998 0.005 6.048 0.005 5.253 C 0.005 1.782 2.443 0.765 2.443 0.765 C 3.672 0.238 5.782 0.017 7.975 0 L 8.029 0 C 10.221 0.017 12.332 0.238 13.561 0.765 C 13.561 0.765 15.999 1.782 15.999 5.253 C 15.999 5.253 16.03 7.814 15.659 9.592 Z M 13.124 5.522 L 13.124 9.725 L 11.339 9.725 L 11.339 5.646 C 11.339 4.786 10.951 4.35 10.175 4.35 C 9.317 4.35 8.887 4.867 8.887 5.891 L 8.887 8.124 L 7.113 8.124 L 7.113 5.891 C 7.113 4.867 6.683 4.35 5.825 4.35 C 5.049 4.35 4.661 4.786 4.661 5.646 L 4.661 9.725 L 2.876 9.725 L 2.876 5.522 C 2.876 4.663 3.111 3.981 3.582 3.476 C 4.067 2.971 4.703 2.712 5.493 2.712 C 6.406 2.712 7.098 3.039 7.555 3.695 L 8 4.39 L 8.445 3.695 C 8.902 3.039 9.594 2.712 10.507 2.712 C 11.297 2.712 11.933 2.971 12.418 3.476 C 12.889 3.981 13.124 4.663 13.124 5.522 Z" style="stroke:none;stroke-miterlimit:10;fill-rule:evenodd;"></path></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
	filter: invert(40%) sepia(60%) saturate(5008%) hue-rotate(325deg) brightness(91%) contrast(89%);
}

.music {
    display: inline-block;
    width: 2em; /* Adjust as needed */
    height: 2em; /* Adjust as needed */
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg role="img" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Music</title><path d="M22 4h-12c-1.105 0-2 0.896-2 2v20c0 1.104 0.895 2 2 2h12c1.104 0 2-0.896 2-2v-20c0-1.104-0.896-2-2-2zM16 26c-1.934 0-3.5-1.567-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5s3.5 1.566 3.5 3.5c0 1.933-1.567 3.5-3.5 3.5zM22 17h-12l0.021-11h11.979v11zM16 20.5c-1.104 0-2 0.896-2 2s0.896 2 2 2 2-0.896 2-2-0.896-2-2-2z"></path></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
	filter: invert(40%) sepia(60%) saturate(5008%) hue-rotate(325deg) brightness(91%) contrast(89%);
}

.garmin {
    display: inline-block;
    width: 2em; /* Adjust as needed */
    height: 2em; /* Adjust as needed */
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg roll="img" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.149 512.149" xml:space="preserve"><g transform="translate(-1)"><g><g><path d="M504.427,111.44l-1.253-1.254c-11.776-11.776-30.967-11.802-42.814,0.035l-46.089,46.574c-2.428,2.436-6.312,2.534-8.845,0.203l-64.618-59.657c-6.276-5.8-14.442-8.987-22.996-8.987h-96.124c-2.269,0-4.44,0.865-6.082,2.419l-81.47,77.356c-11.935,11.944-12.756,31.197-1.818,42.92c5.844,6.268,13.736,9.719,22.219,9.719h0.15c8.413-0.044,16.499-3.619,22.087-9.728l57.538-60.893h20.595L120.63,300.218H37.81c-19.633,0-35.778,14.68-36.758,33.421c-0.521,9.79,2.904,19.094,9.64,26.191c6.638,7,15.969,11.008,25.618,11.008h123.586c2.436,0,4.767-1.006,6.444-2.798l63.32-67.593l53.248,55.684l-16.075,102.735c-4.052,17.02,4.114,34.357,19.412,41.198c4.714,2.119,9.719,3.178,14.698,3.178c5.358,0,10.69-1.227,15.598-3.655c9.481-4.696,16.296-13.285,18.776-23.967l27.463-147.306c0.53-2.86-0.38-5.809-2.445-7.865l-73.295-73.198l58.227-58.138l40.589,40.58c11.335,11.335,31.091,11.335,42.417,0l76.156-76.147c5.623-5.623,8.722-13.109,8.722-21.054C513.149,124.54,510.05,117.063,504.427,111.44z"/><path d="M407.065,114.837c29.211,0,52.966-23.755,52.966-52.966c0-29.211-23.755-52.966-52.966-52.966c-29.21,0-52.966,23.755-52.966,52.966C354.1,91.082,377.855,114.837,407.065,114.837z"/></g></g></g></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
	filter: invert(40%) sepia(60%) saturate(5008%) hue-rotate(325deg) brightness(91%) contrast(89%);
}

.pixelfed {
    display: inline-block;
    width: 2em; /* Adjust as needed */
    height: 2em; /* Adjust as needed */
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg role="img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1034 1024"><pathd="M500 176q-115 0 -215 58q-96 57 -152 153q-58 99 -58 214.5t58 214.5q56 96 152 152q100 58 215 58t215 -58q96 -56 152 -152q58 -99 58 -214.5t-58 -214.5q-56 -96 -152 -153q-100 -58 -215 -58zM432 435h112q36 0 66.5 17.5t48.5 47t18 65t-18 65t-48.5 47t-66.5 17.5h-78l-111 106v-290q0 -31 22.5 -53t54.5 -22z" /></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
	filter: invert(40%) sepia(60%) saturate(5008%) hue-rotate(325deg) brightness(91%) contrast(89%);
}

.bookmark {
    display: inline-block;
    width: 2em; /* Adjust as needed */
    height: 2em; /* Adjust as needed */
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16 2h-8c-1.7 0-3 1.3-3 3v16c0 .2 0 .3.1.5.3.5.9.6 1.4.4l5.5-3.2 5.5 3.2c.2.1.3.1.5.1.6 0 1-.4 1-1v-16c0-1.7-1.3-3-3-3z"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
	filter: invert(40%) sepia(60%) saturate(5008%) hue-rotate(325deg) brightness(91%) contrast(89%);
}


</style>

<!--
<div class="timeline-container">
<div class="timeline">
<div class="outer">
{% for post in combined.combinedActivities %}
  {% if post.type == 'github' %}
	<div class="card github-card">
	<a href="{{ post.link }}" class="microblog-post-link">
		<div class="icon github-icon post-icon w-5 h-5" aria-label="Open GitHub profile"  target="_blank" rel="noopener me">
	        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	            <title>GitHub icon</title>
	            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
	    	</svg>
		</div>
	</a>
		<div class="info">
			<h4 class="title"> {{ post.description }} </p>
		</div>
	</div>
  {% elif post.type == 'mastodon' %}
	<div class="card microblog-card">
		<a href="{{ post.link }}" class="microblog-post-link">
		<div  aria-label="Open Mastodon Feed" target="_blank" class="icon fediverse-icon fediverse-post-icon post-icon" rel="noopener">
	    	<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
	            <title>Mastodon icon</title>
	            <path d="M 15.659 9.592 C 15.424 10.72 13.553 11.956 11.404 12.195 C 10.283 12.32 9.18 12.434 8.003 12.384 C 6.079 12.302 4.56 11.956 4.56 11.956 C 4.56 12.13 4.572 12.297 4.595 12.452 C 4.845 14.224 6.478 14.33 8.025 14.379 C 9.586 14.429 10.976 14.02 10.976 14.02 L 11.04 15.337 C 11.04 15.337 9.948 15.884 8.003 15.984 C 6.93 16.039 5.598 15.959 4.047 15.576 C 0.683 14.746 0.104 11.4 0.015 8.006 C -0.012 6.998 0.005 6.048 0.005 5.253 C 0.005 1.782 2.443 0.765 2.443 0.765 C 3.672 0.238 5.782 0.017 7.975 0 L 8.029 0 C 10.221 0.017 12.332 0.238 13.561 0.765 C 13.561 0.765 15.999 1.782 15.999 5.253 C 15.999 5.253 16.03 7.814 15.659 9.592 Z M 13.124 5.522 L 13.124 9.725 L 11.339 9.725 L 11.339 5.646 C 11.339 4.786 10.951 4.35 10.175 4.35 C 9.317 4.35 8.887 4.867 8.887 5.891 L 8.887 8.124 L 7.113 8.124 L 7.113 5.891 C 7.113 4.867 6.683 4.35 5.825 4.35 C 5.049 4.35 4.661 4.786 4.661 5.646 L 4.661 9.725 L 2.876 9.725 L 2.876 5.522 C 2.876 4.663 3.111 3.981 3.582 3.476 C 4.067 2.971 4.703 2.712 5.493 2.712 C 6.406 2.712 7.098 3.039 7.555 3.695 L 8 4.39 L 8.445 3.695 C 8.902 3.039 9.594 2.712 10.507 2.712 C 11.297 2.712 11.933 2.971 12.418 3.476 C 12.889 3.981 13.124 4.663 13.124 5.522 Z" style="stroke:none;stroke-miterlimit:10;fill-rule:evenodd;"/>
	        </svg>
	    </div>
		</a>
		<div class="info">
			<div class="post-description"> {{ post.description | safe }} </div>
			{% if post.mediaUrl %}
			    {% set extension = post.mediaUrl | slice(-4) %}
			    {% if extension == '.mp4' or extension == '.webm' or extension == '.ogg' %}
			        <video src="{{ post.mediaUrl }}" alt="Media content for the post" class="post-media" controls></video>
			    {% else %}
			        <img src="{{ post.mediaUrl }}" alt="Media content for the post" class="post-media">
			    {% endif %}
			{% endif %}
		</div>
		<p class="post-date"> {{ post.pubDate }} </p>
	</div>
  {% elif post.type == 'garmin' %}	
	<div class="card github-card">
		<div class="icon running-icon post-icon w-5 h-5" aria-label="Open GitHub profile"  target="_blank" rel="noopener me">
	        <svg roll="img" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512.149 512.149" xml:space="preserve">
				<g transform="translate(-1)">
					<g>
						<g>
							<path d="M504.427,111.44l-1.253-1.254c-11.776-11.776-30.967-11.802-42.814,0.035l-46.089,46.574
								c-2.428,2.436-6.312,2.534-8.845,0.203l-64.618-59.657c-6.276-5.8-14.442-8.987-22.996-8.987h-96.124
								c-2.269,0-4.44,0.865-6.082,2.419l-81.47,77.356c-11.935,11.944-12.756,31.197-1.818,42.92
								c5.844,6.268,13.736,9.719,22.219,9.719h0.15c8.413-0.044,16.499-3.619,22.087-9.728l57.538-60.893h20.595L120.63,300.218H37.81
								c-19.633,0-35.778,14.68-36.758,33.421c-0.521,9.79,2.904,19.094,9.64,26.191c6.638,7,15.969,11.008,25.618,11.008h123.586
								c2.436,0,4.767-1.006,6.444-2.798l63.32-67.593l53.248,55.684l-16.075,102.735c-4.052,17.02,4.114,34.357,19.412,41.198
								c4.714,2.119,9.719,3.178,14.698,3.178c5.358,0,10.69-1.227,15.598-3.655c9.481-4.696,16.296-13.285,18.776-23.967
								l27.463-147.306c0.53-2.86-0.38-5.809-2.445-7.865l-73.295-73.198l58.227-58.138l40.589,40.58
								c11.335,11.335,31.091,11.335,42.417,0l76.156-76.147c5.623-5.623,8.722-13.109,8.722-21.054
								C513.149,124.54,510.05,117.063,504.427,111.44z"/>
							<path d="M407.065,114.837c29.211,0,52.966-23.755,52.966-52.966c0-29.211-23.755-52.966-52.966-52.966
								c-29.21,0-52.966,23.755-52.966,52.966C354.1,91.082,377.855,114.837,407.065,114.837z"/>
						</g>
					</g>
				</g>
			</svg>
		</div>
		<div class="info">
			<h4 class="title"> {{ post.description }} </p>
		</div>
	</div>
	{% elif post.type == 'music' %}
	<div class="card music-card">
		<a href="{{ post.link }}" class="microblog-post-link">
		<div  aria-label="Open Music Feed" target="_blank" class="icon music-icon post-icon" rel="noopener">
	    	<svg role="img" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<title>Music</title>
			<path d="M22 4h-12c-1.105 0-2 0.896-2 2v20c0 1.104 0.895 2 2 2h12c1.104 0 2-0.896 2-2v-20c0-1.104-0.896-2-2-2zM16 26c-1.934 0-3.5-1.567-3.5-3.5 0-1.934 1.566-3.5 3.5-3.5s3.5 1.566 3.5 3.5c0 1.933-1.567 3.5-3.5 3.5zM22 17h-12l0.021-11h11.979v11zM16 20.5c-1.104 0-2 0.896-2 2s0.896 2 2 2 2-0.896 2-2-0.896-2-2-2z"></path>
			</svg>
	    </div>
		</a>
		<div class="info">
			<div class="post-description"> {{ post.description | safe }} </div>
		</div>
	</div>
	{% elif post.type == 'pixelfed' %}
	<div class="card pixelfed-card">
		<a href="{{ post.link }}" class="microblog-post-link">
		<div  aria-label="Open Mastodon Feed" target="_blank" class="icon post-icon pixelfed-icon" rel="noopener">
	    	<svg role="img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-10 0 1034 1024">
				<path
				d="M500 176q-115 0 -215 58q-96 57 -152 153q-58 99 -58 214.5t58 214.5q56 96 152 152q100 58 215 58t215 -58q96 -56 152 -152q58 -99 58 -214.5t-58 -214.5q-56 -96 -152 -153q-100 -58 -215 -58zM432 435h112q36 0 66.5 17.5t48.5 47t18 65t-18 65t-48.5 47t-66.5 17.5
				h-78l-111 106v-290q0 -31 22.5 -53t54.5 -22z" />
			</svg>
	    </div>
		</a>
		<div class="info">
			{% if post.mediaUrl %}
			    {% set extension = post.mediaUrl | slice(-4) %}
			    {% if extension == '.mp4' or extension == '.webm' or extension == '.ogg' %}
			        <video src="{{ post.mediaUrl }}" alt="Media content for the post" class="post-media" controls></video>
			    {% else %}
			        <img src="{{ post.mediaUrl }}" alt="Media content for the post" class="post-media">
			    {% endif %}
			{% endif %}
			<div class="post-description"> {{ post.description | safe }} </div>
		</div>
		<p class="post-date"> {{ post.pubDate }} </p>
	</div>
  {% elif post.type == 'bookmark' %}
	<div class="card microblog-card">
		<a href="{{ post.link }}" class="microblog-post-link">
		<div  aria-label="Open Bookmark" target="_blank" class="icon fediverse-icon fediverse-post-icon post-icon" rel="noopener">
	    	<svg role='img' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16 2h-8c-1.7 0-3 1.3-3 3v16c0 .2 0 .3.1.5.3.5.9.6 1.4.4l5.5-3.2 5.5 3.2c.2.1.3.1.5.1.6 0 1-.4 1-1v-16c0-1.7-1.3-3-3-3z"/>
			</svg>
	    </div>
		</a>
		<div class="info">
			<div class="post-description"> {{ post.description | safe }} </div>
		</div>
		<p class="post-date"> {{ post.pubDate }} </p>
	</div>
  {% endif %} 
{% endfor %}
</div>
</div>
</div>
-->
