---
layout:     /layouts/post
title:      "I Posted to Mastodon 1 Mile Away from an Internet Connection"
subtitle:   "Meshtastic Mastastic"
date: 		2025-05-23T10:00:00-05:00
categories: fediverse, mastodon, meshtastic
---

Over the past few months, I've amassed the world's largest collection of [Meshtastic](https://meshtastic.org/) devices (read: 4), and using my newfound power, I have built a Mastodon client that doesn't require an internet connection¹.

### The Plan:

Chain together a series of Meshtastic radios so I can post to my account anywhere in the city without access to my phone.
 
### The Implementation:

Meshtastic provides a [Python library](https://github.com/meshtastic/python) to interact with a connected Meshtastic device over serial (USB) or Bluetooth. We use this to receive messages from our device(s).

1. Connect radio to PC  
2. Python script reads messages from Meshtastic  
3. If sent from authenticated user, post a status to configured Mastodon instance  
4. Python script subscribes to Mastodon user's notifications  
5. When a notification is received, send that to the configured Meshtastic channel  

The script for ['Mastastic' can be found here](https://github.com/TomCasavant/Mastastic).

The problem with my apartment is it's mostly beneath the ground, and the problem with Columbus is it's mostly a city.  
Both of these problems combine to make it very difficult to have the long-range Meshtastic mesh of my dreams.

I used a state-of-the-art extension system for the radio connected to my computer to give it access to the outside world.

| {% image "./meshtastic_bush.jpg", "Photo of a Heltek v3 meshtastic node connected to a USB cable popping out of a green bush" %} |
| :--: |
| **8ft of pure, bona fide USB routed through a hole created by a cat who broke into my apartment** |

The next radio was magnetically secured to a dumpster.

| {% image "./meshtastic_dumpster.jpg", "Photo of a T1000 meshtastic device in a magnetic pencil case attached to a dumpster" %} |
| :--: |
| **A breath of fresh air** |

And the final one was attached to a tree just outside a cemetery.

| {% image "./meshtastic_tree.jpg", "Photo of a Heltek v3 in a camo case wedged in a tree" %} |
| :--: |
| **Just dying to get in** |

### The Result:

At 5:02 PM, I found myself in a desolate Kohl's parking lot 0.5 miles away from my apartment. ~~I pulled out my deck~~  
Using my [LilyGo T-Deck](https://meshtastic.org/docs/hardware/devices/lilygo/tdeck/), a standalone device I have that doesn't require a Bluetooth connection to a phone to use,  
I typed out a command: '`!post sending this #mastodon post over #meshtastic from about 0.5 miles away`',  
and instantly got the acknowledgment from Mastastic that my message was received. Success.

| {% image "./masto_post_1.png", "Screenshot of mastodon post that says 'sending this #mastodon post over #meshtastic from about 0.5 miles away'" %} |
| :--: |
| **[https://tomkahe.com/@tom/114559165475833367](https://tomkahe.com/@tom/114559165475833367)** |

Time to push my luck. I moved across the river to a nearby park, roughly 0.75 miles away from my house, typed out the message:  
'`!post sending this one in a park about 0.75 miles away`'

| {% image "./masto_post_2.png", "Screenshot of mastodon post that says 'sending this one in a park about 0.75 miles away'" %} |
| :--: |
| **[https://tomkahe.com/@tom/114559209932611789](https://tomkahe.com/@tom/114559209932611789)** |

And for the grand finale? I drove up to a nearby Kroger, exactly 1 mile away.

I sent out a '`!ping`' and got the response '`pong!`' from the Python script, and sent forth my command:  
'`!post sending this from a Kroger parking lot exactly 1 mile away`'. The message turned red — it wasn't received by any nodes in the area.

'`!post barely sending this from a Kroger 1 mile away`' I tried again. And again the message turned red. Nothing.

'`!post barely sending this from a Kroger 1 mile away #mastodon #meshtastic`'. It turned green! Unfortunately, not detected by any of my nodes — no post made.

'`!post *barely* sending this from a Kroger 1 mile away`'. Nothing.

'`!ping`'. No response.

'`!ping`'. No response.

Twelve minutes have passed.

'`!ping`'. It turned green! No response.

'`!post sending this from a Kroger`'. Nothing.

'`!post from 1 mile away, barely`'. Nothing.

'`!post sending this from 1 mile away?`'. Green! Nothing.

'`!post maybe possibly 1 mile away?`'. Green! Nothing.

Twenty minutes have passed.

The T-Deck makes a notification sound — new message: '`(username_hidden_for_privacy) liked your status`'.

It was clear the connection was (somewhat) there, but no matter what I did, my messages weren't getting sent out.

'`!post 1 mile away maybe hopefully`'. Nothing.

'`!ping`'. It turned green! No response.

'`!post I'm getting notifications from 1 mile away but no posts :(`'. It turned green! Nothing.

After 25 minutes, I finally started to give up hope and decided to head to my next destination 1.5 miles away.  
(The [Meshtastic Site Planner](https://meshtastic.org/docs/software/site-planner/) had suggested that my apartment might have better signal in an area slightly farther away.)

So, I sent out one final message:

'`!post last try, 1 mile?`'. It turned red. No luck.

But wait, what's this?

| {% image "./masto_post_3.png", "Screenshot of mastodon post that says 'last try, 1 mile?'" %} |
| :--: |
| **[https://tomkahe.com/@tom/114559331767436047](https://tomkahe.com/@tom/114559331767436047)** |

It worked! From exactly 1 mile away, I was able to post to Mastodon, achieving the lifelong goal of millions of posters everywhere.

### Outcomes

It should be easy for someone to take this and extend it to significantly greater distances—and I hope they do. Unfortunately, for now, one mile is the best I can manage.

| {% image "./tdeck_kohls.jpg", "Photo of the LILYGO TDeck with a Kohl's Sign in the background" %} |
| :--: |
| **expect great things** |

---

1. This is a blatant lie. I am a liar.




[Mastastic Source Code](https://github.com/TomCasavant/Mastastic)
