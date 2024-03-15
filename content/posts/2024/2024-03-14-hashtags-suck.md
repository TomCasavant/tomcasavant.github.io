---
layout:     post
title:      "The Problem with Hashtags"
subtitle:	"Working title: Hashtags suck and they should die."
date:       2024-03-14 
categories: social-media, mastodon, activitypub, design
---
I have never been a fan of hashtags and for most of my life I've never bothered to use them.

# The Problem

 There's a number of things I dislike about hashtags and I am [far](https://medium.com/endless/an-open-letter-to-people-who-use-hashtags-89fb7694c97e) from the [first](https://markwyner.medium.com/hashtag-accessibility-by-everyone-for-everyone-298667b2d891) person to  [express problems](https://medium.com/chris-messina/the-problem-with-the-problems-with-hashtags-35d4ba29b04d) with them. But to boil down my own general sentiment: they're annoying to read and (more importantly) they're ugly.
| ![e4b88eba925529a16bc3245857be3772.png](/assets/images/2024/ebea9063d1774a16b6265ccbba1bd0bd.png) |
| :--: |
| *hashtag a hashtag bee hashtag should hashtag be* |

The problem is, no matter how annoying hashtags are to look at, they continue to be incredibly useful. Mastodon (and other activitypub software) would be nearly impossible to use without the ability to discover users and posts through hashtags (despite rolling out opt-in search last year). Threads ran into a similar issue when they launched where users found it difficult to discover other users and launched [their version](https://www.theverge.com/2023/12/7/23992357/threads-hashtags-tags) of hashtags 5 months later. For now they're unavoidable. 

However, that doesn't mean they can't be improved. Hashtags in Threads, for example, don't include the '#' and are restricted to 1 tag per post. I don't use threads all that often and the limit of one tag per post feels pretty restrictive, but it *does* look significantly better. 

![](/assets/images/2024/e68555bd2f7b4e47b5ab3f6f05493b15.png)

# The Solution
Over the past few months I've been working on a better solution for my mastodon experience. 

1. I should be able to use any number of hashtags in a single post. If I post about the Bengals with #Bengals very few people wil see it. If I instead use #NFL many people will see it but nobody who is *exclusively* interested in the Bengals will. Since mastodon is already setup this way no changes need to be made.
2. In-line hashtags (hashtags that appear within a post's content) should *not* have the '#' symbol. This keeps posts much cleaner and makes it significantly easier to read (but they should still link to the hashtag feed)

| ![e9f96c015cc9648c4406227bd8a07372.png](/assets/images/2024/0b3eb4520d9b4728b81a61f8e673e552.png) |
| :--: |
| *We can finally read the Bee movie in peace* |

3. Categorical hashtags (hashtags that exist solely to add metadata to a post) should not be visible. These are the tags that typically appear in the official Mastodon web UI's hashtag bar at the end of a post.
4. *UNLESS* I am following the categorical hashtag. I should *always* know why a post is appearing in my timeline (This also helps with spam, I should know exactly which tag a spam status using that causes me to see it).
5. Editing a status should show me the tags that were removed from the post so they can be edited as well
6. The experience should be consistent between the web-ui and the mobile experience

| ![mastodoncomparison.png](/assets/images/2024/mastodoncomparison.png) |
| :--: |
| *Note that #nature is visible because I follow the #nature hashtag* |

# Implementation

In my [fork of mastodon](https://github.com/TomCasavant/mastodon) I've implemented those changes. ActivityPub made this a lot easier because they already separate out the tags from the CREATE activity so all I needed to do was remove them from the status after the post was created/updated, using the same setup that mastodon uses to create the HashtagBar I was able to remove categorical hashtags entirely. 

I also created a [fork of moshidon](https://github.com/TomCasavant/moshidon), I chose moshidon because I already use it as my primary client but also because it already has an a callout that appears when a post is in your timeline because of a hashtag you follow (4). With a few small changes I was able to fix the edit window so it requests all the tags in the original post from my server and appends them to the edit window and set it up so hashtags would render as normal URLs w/o the '#' symbol (they still link to the hashtag view). 

# Issues

There are a few things that as of this moment I have not figured out a good solution to.
1. If I want to remove the in-line hashtags from the status before I send it out to other servers all foreign servers/clients will link my hashtags as 'https://tomkahe.com/tags/TAG' instead of linking to their own respective hashtag view. From what I've seen there are already servers that render tags like this. My best guess of what to do in this situation is to send the position in the text where tags occur alongside all the tags in the status then clients would be able to properly render them. But for now I've backed off on this point and so in-line tags will only render properly in my clients, other clients/users will still see the '#' symbol in my posts.
2. There is no easy way to see a list of all the tags in the post in a mobile client. There are situations where you might want to see every tag a post contains and as of this moment the only way to do that is open up the status in the web view. This is not a difficult issue to fix, it would just involve modifying the client to have a dropdown view on every status you can click to see the tags but I have not implemented it yet. This is probably an issue most clients should fix as every client I've seen will happily render a status with hidden tags and they have no way of showing you which tags are present. 
