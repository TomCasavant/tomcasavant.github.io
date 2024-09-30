---
layout:     /layouts/post
title:      "Surrender Index"
subtitle:   "Porting twitter bots to the fediverse"
date: 2024-09-30T10:00:00-04:00
categories: fediverse, mastodon, jonbois, bot, nfl
---

There were a few different projects I was working on the last month, most didn't feel all that worthy of a blog post. I modified my Mastodon server to only process posts from a relay if a user on my server is following a hashtag in the post to hopefully save money on storage and bandwith costs (but then Mastodon announced a project to [improve discoverability](https://www.fediscovery.org/) and I ended up moving my S3 bucket to local storage so none of that ultimately mattered). I'm working on a project with one of my Spotify playlists (I [haven't touched](https://tomcasavant.com/playlist-creator-and-58-a-python-spotify-creation/) the spotify API in [awhile](https://github.com/TomCasavant/SpotifyAnimated) and wanted to do some [more](https://github.com/TomCasavant/SpotifyTrackComparison) with it- but it's still not in a good enough state for a blog post)

Over the weekend, however, I really wanted to revive one of my favorite Twitter bots from years ago that was based on a [Jon Bois](https://bsky.app/profile/jonbois.bsky.social) video. If you haven't seen it ([https://www.youtube.com/watch?v=F9H9LwGmc-0](https://www.youtube.com/watch?v=F9H9LwGmc-0)) basically, Jon Bois describes an algorithm that can be used to determine just how cowardly any given punt is. Punting from 4th and 25 from your own side of the field, for instance, is significantly less cowardly than punting at 4th and 1 from the opposing side of the field. There was a bot developed that would grab data from ESPN and live-calculate the score for every punt during games and tweet it out, which was a lot of fun and made it easy to judge your least favorite team for being weak-minded. 

I took a look at the [existing source code](https://github.com/andrew-shackelford/Surrender-Index) for the Twitter-based bot and it looked pretty straightforward aside from using selenium to interact with Twitter elements (I can only assume this was to avoid the Twitter API costs). I cleaned up the code and implemented the Mastodon API to bring the 2 bots to my Mastodon server which you can follow here:

[@surrender_index@tomkahe.com](https://tomkahe.com/@surrender_index) - Posts a status for *every* punt in each NFL game indicating the surrender index of that punt.

[@surrender_idx90@tomkahe.com](https://tomkahe.com/@surrender_idx90) - Boosts posts from the main surrender index account if the index is >90. It also posts polls which allows you to 'cancel' a punt's surrender index if you think the punt wasn't *truly* cowardly (it'll unboost the post if the poll determines it to be an invalid index) 

[Soure Code](https://github.com/TomCasavant/Surrender-Index)
