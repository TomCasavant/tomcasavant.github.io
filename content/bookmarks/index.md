---
layout: layouts/home.njk
title:
eleventyNavigation:
  key: Bookmarks
  order: 3
---
### Bookmarks from [@tom@tomcasavant.glitch.me](https://tomcasavant.glitch.me/)

{% for item in bookmarks.bookmarks %}
	<div class="card">
		<h4 class="bookmark-title"> [{{item.title}}]({{item.url}}) </h4>
		<p class="bookmark-summary"> {{item.summary}} </p>
	</div>
{% endfor %}
