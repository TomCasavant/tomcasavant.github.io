---
layout: layouts/portfolio.njk
title: Portfolio
eleventyNavigation:
  key: Portfolio
  order: 2
---
# Project Portfolio
Some of the more useful projects I've built:

{%- set categories = [] -%}

{%- for project in collections.projects -%}
  {%- set cat = project.data.category or "Uncategorized" -%}
  {%- set found = false -%}

  {%- for category in categories -%}
    {%- if category.name == cat and not found -%}
      {%- set _ = category.projects.push(project) -%}
      {%- set found = true -%}
    {%- endif -%}
  {%- endfor -%}

  {%- if not found -%}
    {%- set _ = categories.push({ name: cat, projects: [project] }) -%}
  {%- endif -%}
{%- endfor -%}

{%- for category in categories -%}
  <h2>{{ category.name }}</h2>
  <div class="portfolio-grid">
    {%- for project in category.projects -%}
      {%- set currentProject = project -%}
      {%- include "layouts/project-box.njk" -%}
    {%- endfor -%}
  </div>
  <br />
{%- endfor -%}

