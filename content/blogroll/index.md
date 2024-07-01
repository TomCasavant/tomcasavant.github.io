---
layout: layouts/home.njk
eleventyNavigation:
  key: Blogroll
  order: 9
---
## Content I Consume
#### (Sorted by most recent post)

{% for name, details in blogroll.blogroll %}
    <div class="spoiler-container blogroll">
        <p style="display: inline;">{{ name }}</p>
        <input type="checkbox" id="{{ name|replace(' ', '-') }}-checkbox" class="spoiler-checkbox">
        <label for="{{ name|replace(' ', '-') }}-checkbox" class="spoiler-label">
            <span class="arrow-down">&#9650;</span>
        </label>
        <div class="spoiler-content">
            <p class="blogroll-tags">Tags: {{ details.tags | join(', ') }}</p>
            <ul class="blogroll-profiles">
				{% for profile in details.profiles %}
				    <li>
				        <a href="{{ profile.url }}">{{ profile.username or profile.url }}</a> ({{ profile.type }})
				        {% if profile.content %}
				            <div class="blogroll-content">
				                {% if profile.content.title %}
				                    <h4><a href="{{ profile.content.link }}">{{ profile.content.title }}</a></h4>
				                {% else %}
				                    <h4><a href="{{ profile.content.link }}">See more</a></h4>
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

    .spoiler-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 10px;
    background-color: black;
    }

    .spoiler-container p {
    margin: 0;
    }

    .spoiler-checkbox {
    display: none;
    }

    .spoiler-label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    }

    .arrow-down {
    margin-left: 5px;
    transition: transform 0.3s;
    }

    .spoiler-checkbox:checked + .spoiler-label .arrow-down {
    transform: rotate(180deg);
    }

    .spoiler-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    }

    .spoiler-checkbox:checked ~ .spoiler-content {
    max-height: 500px; /* Adjust based on your content */
    }

    .blogroll-tags {
    font-size: 0.9em;
    color: #666;
    }

    .blogroll-profiles {
    list-style-type: none;
    padding: 0;
    margin: 10px 0 0;
    }

    .blogroll-profiles li {
    margin-bottom: 10px;
    }

    .blogroll-profiles a {
    text-decoration: none;
    }

    .blogroll-profiles a:hover {
    text-decoration: underline;
    }

    .blogroll-content {
    padding-left: 15px;
    border-left: 3px solid #0073e6;
    margin-top: 10px;
    }

    .blogroll-content h4 a {
    margin: 0;
        color: orange;
    }

    .blogroll-content p {
    margin: 5px 0;
    font-size: 0.9em;
    color: #333;
    }



</style>




