---
layout: layouts/home.njk
eleventyNavigation:
  key: Bookmarks
  order: 3
---
### Bookmarks from [@tom@tomcasavant.glitch.me](https://tomcasavant.glitch.me/)

{% for item in bookmarks.bookmarks %}
	<div class="bookmark">
		<h4 class="bookmark-title"> [{{item.title}}]({{item.link}}) </h4>
		<p class="bookmark-summary"> {{item.summary}} </p>
	</div>
{% endfor %}