---
layout: layouts/home.njk
eleventyNavigation:
  key: Feeds
  order: 3
---
## Recent Activities

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
  {% endif %} 
{% endfor %}
</div>
</div>
</div>