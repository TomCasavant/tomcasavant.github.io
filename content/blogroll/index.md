---
layout: layouts/home.njk
eleventyNavigation:
  key: Blogroll
  order: 9
---
## Content I Consume
#### (Sorted by most recent post)

{% for name, details in blogroll.blogroll %}
    <div class="spoiler-container">
        <p style="display: inline;">{{ name }}</p>
        <input type="checkbox" id="{{ name|replace(' ', '-') }}-checkbox" class="spoiler-checkbox">
        <label for="{{ name|replace(' ', '-') }}-checkbox" class="spoiler-label">
            <span class="arrow-down">&#9660;</span>
        </label>
        <div class="spoiler-content">
            <p>Tags: {{ details.tags | join(', ') }}</p>
            <ul>
				{% for profile in details.profiles %}
				    <li>
				        <a href="{{ profile.url }}">{{ profile.username or profile.url }}</a> ({{ profile.type }})
				        {% if profile.content %}
				            <div class="rss-content">
				                {% if profile.content.title %}
				                    <h4><a href="{{ profile.content.link }}">{{ profile.content.title }}</a></h4>
				                {% else %}
				                    <h4><a href="{{ profile.content.link }}">Read more</a></h4>
				                {% endif %}
				                {% if profile.content.pubDate %}
				                    <p>{{ profile.content.pubDate }}</p>
				                {% endif %}
				            </div>
				        {% endif %}
				    </li>
				{% endfor %}
            </ul>
        </div>
    </div>
{% endfor %}


<style>
    .spoiler-checkbox {
        display: none;
    }

    .spoiler-content {
        display: none;
        margin-top: 10px; /* Adjust as needed */
    }

    .spoiler-checkbox:checked + .spoiler-label + .spoiler-content {
        display: block;
    }
</style>




