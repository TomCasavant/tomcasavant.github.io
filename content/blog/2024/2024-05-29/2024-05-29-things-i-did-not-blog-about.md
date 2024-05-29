---
layout:     /layouts/post
title:      "Things I Did Not Blog About"
subtitle:   "Including but not limited to inserting a 3D model of my brother into a pokemon game"
date:       2024-05-29
categories: 3dprinting, running, keyboards, mastodon
---

Here's a bunch of things I did that, for any number of reasons, I didn't bother writing about.

## My Brother's Keeper

| {% image "./roger-snapchat-model.jpg", "The 3D model of roger in a snapchat window" %} |
| :--: |

I used a photo of my twin to generate a 3D model of him and then I attempted to insert that 3D Model into two different games, made a video of a giant waffle version of him in space with the theme to 2001 A Space Odyssey playing in the background, rotated his spine out of his body to create a weird monster version of him, and created a [snapchat lens](https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=b68cf3b8819242c6896440f35ecbfe09&metadata=01) that lets you rotate, resize, and place the 3D model of my twin anywhere you want. 

| {% image "./roger-gameboy-2.jpg", "The 3D model of Roger in a pokemon game" %} |
| :--: |

<div class="video-container">
  <video controls="">
    <source src="/video/roger-gameboy.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<div class="video-container">
  <video controls="">
    <source src="/video/mario-kart-roger.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Mechanical Keyboards
Assembled a hot swappable keyboard with [Lord of the Rings keycaps](https://drop.com/featured/lotr)

| {% image "./lotr-keyboard.jpg", "Photo of the keyboard with lord of the rings keycaps" %} |
| :--: |

Soldered and Assembled the [Scotto34](https://scottokeebs.com/blogs/keyboards/scotto34-pcb-keyboard)

| {% image "./scotto34-keyboard.jpg", "Photo of the scotto34 keyboard" %} |
| :--: |


## 3D Prints/Hardware
I assembled the [Input Labs Alpakka](https://inputlabs.io/alpakka), an open source gyro focused gamepad, which was surprisingly comfortable to hold considering it was entirely made of 3d printed parts. 

| {% image "./alpakka-controller.jpg", "Photo of the Input Labs Alpakka Controller, black body yellow buttons" %} |
| :--: |

I 3D Printed and assembled the [OctoLamp](https://github.com/martinwoodward/octolamp)

| {% image "./github-logo-lamp.jpg", "Photo of Github Logo Lamp lit up in shades of pink" %} |
| :--: |

I 3D Printed and Assembled the [Lord of the Rings Lamp](https://www.printables.com/model/436448-lord-of-the-rings-lamp), and slightly modified the light ring to let me use the LED Strip I already had along with WLED.

| {% image "./lotr-lamp.PNG", "Photo of the ring from Lord of the Rings as a lamp, lit up with Red LEDs" %} |
| :--: |

I 3D Printed a shell for a picamera and raspberry pi to build the [Gif Camera](https://github.com/nickbrewer/gifcam) with the intention of using the [BeReal (unofficial) API](https://github.com/chemokita13/beReal-api) to upload images to BeReal directly from the camera, but there were issues with the post endpoint so that aspect was never completed. But I adjusted it to use Mastodon and other minor changes so it worked with the newer PiCamera in [my fork](https://github.com/tomcasavant/gifcam)

I 3D Printed [Wormhole Chess](https://www.youtube.com/watch?v=ohfqQ_8oEoY) mainly to experiment with putting magnets into 3D Prints

| {% image "./wormhole-chess.jpg", "Photo of the 3d printed chessboard with a hole in the middle that leads to another chessboard" %} |
| :--: |

I built a [pwnagotchi](https://pwnagotchi.ai/) and 3d printed a case for it

I built a battery powered homeasistant dashboard with an E-Ink screen and a 3D printed shell

| {% image "./homeassistant-dashboard.jpg", "Photo of the purple 3d printed dashboard showing the date along with temperature/humidity from inside and outside" %} |
| :--: |

I 3D printed [The Moon Lamp](https://www.printables.com/model/23859-designer-moon-lamp/files). It did not go well, there is a lot of hot glue, and I don't think I can ever remove the bulb without breaking it. 

| {% image "./moon-lamp.jpg", "Photo of the moon lamp with a bulb colored blue inside" %} |
| :--: |

## Software
I used github actions to slowly simulate a chess game while displaying the current chess piece formation using LaTeX which you can see in this [Github Repo](https://github.com/TomCasavant/latex-chess) - Basically there was a github action on a cron schedule to run a python script that would load in the current moves in a chess game, pick the next action, generate a .tex file with the new chessboard, convert that to a PDF and then convert the PDF to a screenshot of the board which would display in the README. 

I created a [Decky Loader](https://decky.xyz/) plugin for the Steam Deck that lets you upload a screenshot straight from the Gamepad UI to any mastodon-compatible API, it can also auto-upload screenshots immediately after taking them. It's still somewhat glitchy and I was running into issues with Pixelfed's API (which I believe have been fixed recently) which required users to create a APP manually from their pixelfed settings. Repo: [TomCasavant/DeckMastodonPoster](https://github.com/TomCasavant/DeckMastodonPoster)

While experimenting with the mastodon API, I created a very simple Wikipedia-Mastodon Bot which posts a 'Today in History' post every day at 6PM EST to [@daily_wikipedia@tomkahe.com](https://tomkahe.com/@daily_wikipedia). Repo: [TomCasavant/wikibot](https://github.com/TomCasavant/wikibot)

Experimenting with a library called [PySceneDetect](https://github.com/Breakthrough/PySceneDetect) I built a bot that would attempt to extract clips from a tv show and post them to mastodon (it's hit or miss) [@community@tomkahe.com](https://tomkahe.com/@community). [TomCasavant/mastodon-plex-scenes](https://github.com/TomCasavant/mastodon-plex-scenes)

A few years ago I was connecting random things together in Homeassistant and ended up with an automation that takes the current song I'm listening to and posts it to this mastodon account: [@tomsmusic@mastodon.social](https://mastodon.social/@TomsMusic)

After getting somewhat annoyed that following a lemmy/kbin community from mastodon meant I had to see every single comment on every single post boosted into my timeline, a built a sort-of fix for it with a proxy account that follows the lemmy communities and only boosts the top-level posts. [TomCasavant/mastodon-groupy](https://github.com/TomCasavant/mastodon-groupy) and example bot is located [@groups@tomkahe.com](https://tomkahe.com/@groupy)

I forked [Postmarks](https://github.com/ckolderup/postmarks) - a federated bookmarking platform that can be hosted on [glitch.com](glitch.com) so I could make some opinionated changes to how it worked for me such as keeping the hashtags hidden from the post, adding in profile fields, embedding spotify/youtube iframes, and automatically archiving links on the Internet Archive. Repo: [TomCasavant/tom-postmarks](https://github.com/TomCasavant/tom-postmarks)

I modified a chrome extension to place images of my twin in all your youtube thumbnails - this only sort of counts because all I did was swap out some photos and learn how to build Firefox/Chrome packages. [TomCasavant/Rogerify-Youtube](https://github.com/TomCasavant/Rogerify-Youtube)

| {% image "./rogerify.png", "Screenshot of a youtube thumbnail entitled 'classical music but its lofi' with my brother inserted into the thumbnail" %} |
| :--: |

I used an unofficial Animal Crossing API to have my character automatically say (in a chat bubble) what song I'm listening to

| {% image "./AnimalCrossing.PNG", "Photo of a switch showing my Animal Crossing character saying 'Invisible String' which was the Taylor Swift song I was listening to" %} |
| :--: |

## Running
I ran a 5k while carrying a 5lb pumpkin

| {% image "./pumpkin-run.jpg", "Photo of me running while carrying a 5lb pumpkin over my shoulder" %} |
| :--: |

In September of 2022 I read an article about a person who decided to walk 20,000 steps a day for a week and they said it was something they'd never do again because of how difficult it was. So in October of 2022 I walked/ran 30,000 steps (it felt unfair to only do 20,000 since I was already doing 15,000 a day) every day for a month and it was an exhausting experience that I will never do again. I ended the month with 1,000,090.

I was feeling pretty great at the end of the month so I decided to run 2 miles every hour over the course of 24 hours (I ended up attaching a 25th hour so I could even it out at 50 miles). That was October 29th-30th, 2022. October 29th remains my record for steps in a day at 73,066. 

I am not a fan of seeing numbers go down so for the entirety of 2023 I walked/ran at least 20,000 steps every single day, ending the year with 7,473,873 total steps (a total distance of 3492.9 miles). It started off well but by July I started getting extemely exhausted every day and runs were replaced with walks resulting in significantly less distance ran than I normally do in a year. 

| {% image "./garmin-steps.jpg", "Screenshot from Garmin showing an average of 20,476 steps every day throughout 2023" %} |
| :--: |
