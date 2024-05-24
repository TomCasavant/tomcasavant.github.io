---
layout: layouts/home.njk
eleventyNavigation:
  key: Feeds
  order: 3
---
### Microblog posts from [@tom@tomkahe.com](https://tomkahe.com/@tom)

{% for post in feeds.posts %}
  <a href="{{ post.link }}" class="microblog-post-link">
	  <div class="microblog-post">
	    <p class="post-description"> {{ post.description | sanitize }} </p>
	    <p class="post-date"> {{ post.pubDate }} </p>
	    {% if post.mediaUrl %}
	      <img src="{{ post.mediaUrl }}" alt="Media content for the post" class="post-media">
	    {% endif %}
	  </div>
  </a>
{% endfor %}
