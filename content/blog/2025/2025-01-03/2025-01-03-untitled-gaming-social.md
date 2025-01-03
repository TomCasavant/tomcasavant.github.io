---
layout:     /layouts/post
title:      "Untitled Gaming Social"
subtitle:   "ActivityPub platform that bridges my Steam screenshots to the social web"
date: 		2025-01-03T10:00:00-05:00
categories: fediverse, activitypub, steam, gaming
---

[![Follow @MrPresidentTom@ugs.tomkahe.com](https://fedi-badge.deno.dev/@MrPresidentTom@ugs.tomkahe.com/followers.svg?style=plastic)](https://ugs.tomkahe.com/user/MrPresidentTom)


Early last year I had built a plugin for Steam Decky Loader that would [upload your screenshots to a mastodon-compatible API](https://github.com/TomCasavant/DeckMastodonPoster).
My goal was to automatically upload those images to a Pixelfed profile, but I ran into several issues (there was no secure way to store passwords/keys 
in decky and [Pixelfed has a persistent bug](https://github.com/pixelfed/pixelfed/issues/2522) I was running into with OAuth) and eventually
I just threw it away. 

Finally, I have come back to this general idea. But, instead of implementing it in the Steam client, I've instead set up a small ActivityPub
server that uses the Steam API to fetch new screenshots and publish them to followers of the account. The server doesn't actually store any image files at the moment so it should be rather lightweight, though this may change in the future.

I'm not sure what this will look like in the future, but I'd like to also find a way to federate achievements on both Steam as well as other gaming platforms.
(My current thinking is a `Note` object with additional fields and an emoji representing the achievement icon? Still working it out)

Current features:
- Creates an ActivityPub profile with your Steam profile image as the user image. 
- Each profile, when viewed at the original page, should redirect to the user's Steam profile
- Each screenshot has a corresponding `Note` object with the image attachment and the game name
- Maintains a list of followers for the user
- Every 10 minutes it looks back at the most recent uploaded screenshots via the Steam web API, if there are any new posts it makes a `Create` activity and shares it with the account's followers
- (May be removed later) Every 45 minutes it grabs a screenshot from the database, if it hasn't already made a `Create` activity it will send out that post to all the followers (this is intended to backfill all my previous screenshots)
- Searching for a post via its Steam URL
  - e.g. searching for [https://ugs.tomkahe.com/activities/https://steamcommunity.com/sharedfiles/filedetails/?id=2856153203](https://steamcommunity.com/sharedfiles/filedetails/?id=2856153203) should fetch the activity

Up Next:
- Add a web frontend
- Handle Like/Boost activities and display them in the frontend
- Discoverability tag for profile/posts
- Steam Achievement Support
- Retroachievement profile support
- Ability to follow other users

Longer Term Plans:
- Multi-user support
- Some sort of API that lets you share screenshots from games outside of traditional platforms (e.g. upload screenshots from an Android App)

| {% image "./ugs.png", "Screenshot of the UGS profile as visible from my Mastodon server." %} |
| :--: |

I wouldn't recommend attempting to build/run it just yet, there's still a lot of work to be done and the database structure is far from finalized but the source code is available under the MIT license up on github.
I also have my instance running up on a Linode server at [https://ugs.tomkahe.com/](https://ugs.tomkahe.com/), so you should *theoretically* be able to follow that account from your own instance by searching for @MrPresidentTom@ugs.tomkahe.com.

[Source Code](https://github.com/TomCasavant/ugs)
