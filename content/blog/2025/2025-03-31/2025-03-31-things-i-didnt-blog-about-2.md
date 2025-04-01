---
layout:     /layouts/post
title:      "Things I Did Not Blog About 2"
subtitle:   "The Second One"
date: 		2025-03-31T10:00:00-05:00
categories: fediverse, activitypub, 3dprint, glitch, gameboy
---
[![Follow @GiftArticles@tomkahe.com](https://fedi-badge.deno.dev/@GiftArticles@tomkahe.com/followers.svg?style=plastic)](https://tomkahe.com/@GiftArticles)
[![Follow @tmnt@logos.deno.dev](https://fedi-badge.deno.dev/@tmnt@logos.deno.dev/followers.svg?style=plastic)](https://logos.deno.dev)
[![Follow @gulfof@mapbot.deno.dev](https://fedi-badge.deno.dev/@gulfof@mapbot.deno.dev/followers.svg?style=plastic)](https://mapbot.deno.dev)

Last year I wrote about [everything I hadn't written about](https://tomcasavant.com/things-i-did-not-blog-about/) and now I have done it again.

# Bots, Bots, Bots
Early this year, a framework for easily building bots on the fediverse w/o being attached to a specific instance called [BotKit](https://botkit.fedify.dev/) was released. This lets you write a bot that can be deployed to deno (or other hosting platform) with ease. 

Also earlier this year, MapQuest released a tool to rename the Gulf of Mexico to whatever you want. I noticed that the generated image could be grabbed directly by plugging arguments into this url [https://gulfof.mapquest.com/img/map?name=example+text](https://gulfof.mapquest.com/img/map?name=example+text) which meant that I could display images without actually storing any of them on deno. I quickly got to work and combined BotKit with the MapQuest API and created [@gulfof@mapbot.deno.dev](https://mapbot.deno.dev), a very simple bot that will reply with the edited map when tagged on the fediverse. [Source Code](https://github.com/TomCasavant/GulfOf)

A week later, I couldn't stop thinking about that image endpoint and so I was interested in building one myself a website that dynamically generates an image that didn't need to be stored anywhere. Years ago [based on this xkcd](https://xkcd.com/1412/), there was a website released that let you plug in any text and it would generate the TMNT logo, unfortunately, it was built entirely with css and html which made it very difficult to convert it into an image. I tried a few ways to screenshot it from my glitch site but nothing was working, so I ended up just building a glitch page from scratch that builds the image. Thus, [https://tmnt-logo.glitch.me/](https://tmnt-logo.glitch.me/) was born. You can generate the image by plugging in any text to [https://tmnt-logo.glitch.me/img?text=teenage+mutant+ninja+turtles&background=transparent&width=550&height=200](https://tmnt-logo.glitch.me/img?text=teenage+mutant+ninja+turtles&background=transparent&width=550&height=200) (and an optional width/height and background. If the width/height isn't provided it will attempt to fit the image to the text w/ reasonable accuracy). Source Code: [remixable on glitch.com](https://glitch.com/edit/#!/tmnt-logo) or [on github](https://github.com/TomCasavant/tmnt-logo-generator).

Now that I had that website, I could quickly build the [@tmnt@logos.deno.dev](https://logos.deno.dev) bot by making some modifications to the earlier @GulfOf bot. If you tag @tmnt@logos.deno.dev with some text it will automatically reply to you with the generated image. [Source Code](https://github.com/TomCasavant/tmnt-logo-bot)

The last bot I've made (so far) this year is [@GiftArticles@tomkahe.com](https://tomkahe.com/@GiftArticles). Early last year I was looking for a way to get RSS feeds of Bluesky feeds to no avail, but I went looking for it again last month and found the perfect alternative. Bluesky has a public API that lets you view a feed as JSON: [here is what that looks like](https://public.api.bsky.app/xrpc/app.bsky.feed.getFeed?feed=at://did:plc:o4s55v3tsfph6whswxccpsia/app.bsky.feed.generator/aaaixbb5liqbu), which meant I could finally bring my favorite Bluesky feed over to the Fediverse. [this](https://bsky.app/profile/davidsacerdote.bsky.social/feed/aaaixbb5liqbu) is a feed that finds any post on Bluesky/atproto that has shared a gift article (or a URL that lets you bypass a news paywall). It's a rather noisy bot so the way I use it at the moment is I mute it from my home timeline and when I'm browsing the trending links from any news site I *don't* subscribe to, I can just scroll through the users discussing it and find @GiftArticles.

# Glance
I started using a self-hosted dashboard called [Glance](https://github.com/glanceapp/glance) this month and added a couple of [community widgets](https://github.com/glanceapp/community-widgets) that have improved my experience. [This one](https://github.com/glanceapp/community-widgets/pull/8) fetches all the trending news on my Mastodon instance and [this one](https://github.com/glanceapp/community-widgets/pull/7) fetches trending news from the Trending News feed on Bluesky.

# DIY
I printed a case for a Heltek meshtastic device, but I have deemed it too ugly to share.

3D Printed Television [source](https://makerworld.com/en/models/480190-retro-style-tv-case-for-4inch-waveshare-screen#profileId-391702). I wrapped the resulting print in a wood vinyl film.
| {% image "./tv.jpg", "Photo of the completed retro 3D printed TV with a fake wood-grain wrap." %} |
| :--: |

And finally for the crème de la crème, I received a Game Boy Color along with something else I ordered a few years ago for a unrelated project. The GBC was listed as broken but from what I could determine it was just the buttons that weren't working, it was reading cartridges just fine. That sat in my closet for years *until now*. I swapped out the old screen for an OLED display and cleaned all the button pads and now I've got a modern and beautiful Game Boy Color (the speaker still needs to be replaced but that replacement won't be here until this weekend).

| {% image "./gbc_before.jpg", "Before photo of a purple Game Boy Color with a dim screen showing Link's Awakening" %} | {% image "./gbc_after.jpg", "After photo of a transparent purple Game Boy Color with a bright OLED showing Link's Awakening" %} |
| :--: | :--: |
| **Before** | **After** |


