---
layout: layouts/home.njk
title: Food
eleventyNavigation:
  key: Food
  order: 3
---
# Food
### Badly taken photos of even worse foods

<div class="row">
  {% set totalImages = collections.foodImages | length %}
  {% set imagesPerColumn = totalImages / 4 | round %}
  {% set columnCounter = 0 %}
  <div class="column">
    {% for image in collections.foodImages %}
      {% if columnCounter >= imagesPerColumn %}
        </div><div class="column">
        {% set columnCounter = 0 %}
      {% endif %}
      <div>
        <a href="/food/{{ image.file | splitPath | slug }}/">
          {% img image.file, image.caption %}
        </a>
      </div>
      {% set columnCounter = columnCounter + 1 %}
    {% endfor %}
</div>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px; /* Adjusted margin to counter padding on columns */
}

.column {
  flex: 0 0 25%; /* Four columns */
  max-width: 25%;
  padding: 8px; /* Added padding to create space between columns */
  box-sizing: border-box; /* Include padding in width calculation */
}

.column a {
  display: block;
  overflow: hidden; /* Ensure images don't overflow columns */
  position: relative; /* Position for image zoom */
}

.column img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.column img:hover {
  transform: scale(1.1); /* Zoom in on hover */
}

.desc {
  margin-top: 8px;
  text-align: center;
}

</style>
