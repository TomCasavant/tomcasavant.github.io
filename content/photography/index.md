---
layout: layouts/home.njk
title: Photography
tag: photography
eleventyNavigation:
  key: Photography
  order: 3
---
# Photography

<div id="images-wrapper">
{% for image in collections.photography %}
<a href="/photography/{{ image.file | splitPath | slug }}">
{% set imagePath = 'photos/' + image.file %}
{% imgVisibleOnly imagePath %}
</a>
{% endfor %}
</div>

<style>
#images-wrapper {    
  line-height: 0;       
  column-count: 5;
  column-gap: 12px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 8px;
}

#images-wrapper img {    
  width: 100%;    
  height: auto;  
  margin-bottom: 12px;
  display: block;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

#images-wrapper img:hover {
  transform: scale(1.05);
}

@media (max-width: 1200px) {
  #images-wrapper {
    column-count: 4;
  }
}
@media (max-width: 900px) {
  #images-wrapper {
    column-count: 3;
  }
}
@media (max-width: 600px) {
  #images-wrapper {
    column-count: 2;
  }
}
@media (max-width: 400px) {
  #images-wrapper {
    column-count: 1;
  }
}
</style>
