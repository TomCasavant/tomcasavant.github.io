---
layout:     /layouts/post
title:      "DuckDuckSocial"
subtitle:   "Firefox extension that adds mastodon search results to DuckDuckGo"
date: 2024-08-21T10:00:00-04:00
categories: fediverse, social web, firefox, extensions
---

A while ago, Google started displaying relevant tweets whenever you searched for anything, allowing you to see more up-to-date news on whatever you were searching for because Twitter (for a long time) was where news would often drop first, before organizations had time to write articles (or before Google had a chance to index them). Last week, I needed some info about something and couldn’t find it after searching DuckDuckGo and Google, but I *did* end up finding it in a quick search of my Mastodon instance—someone had blogged about it that same day.

Shortly after that, I built a Firefox extension called [DuckDuckSocial](https://addons.mozilla.org/en-US/firefox/addon/duckducksocial/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search) (excuse the name, I tried a few and eventually gave up), which uses your Mastodon-compatible fediverse instance (just plug in a developer API key) to append a set of relevant posts to your search results.

| {% image "./desktop-screenshot.png", "Screenshot of DuckDuckGo page with fediverse search results" %} |
| :--: |

And with mobile support!
| {% image "./mobile-screenshot.jpg", "Screenshot of Mobile DuckDuckGo page with fediverse search results" %} |
| :--: |

I figured I would try it out for a few days before I published it, but it *has* helped me several times since then, so here it is.

The two issues right now:
1. The pop-in is pretty weird; it takes about 1-2 seconds after a page loads before the instance search results load in. I’m not sure of the best way to handle this or if this is as good as it gets.
2. Mastodon’s search is pretty limited, and with me being on a smaller instance, it tends to result in 0 results. Maybe one day, Mastodon will provide some form of ranked search to provide more relevant results, but as it is, it has its limits.

[Source Code](https://github.com/TomCasavant/DuckDuckSocial)
