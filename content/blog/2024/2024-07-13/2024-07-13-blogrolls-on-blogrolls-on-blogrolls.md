---
layout:     /layouts/post
title:      "Blogrolls on Blogrolls on Blogrolls"
subtitle:   "I enjoy reading blogs. Unfortunately, discovering blogs isn't exactly the easiest thing to do, most of the ones I've subscribed to after finding the authors on Twitter (formerly), The Fediverse, Flipboard, and other social platforms.
A lot of the mainstream platforms tend to downrank links and there are not many platforms the open social web known for discoverability (yet)."
date: 2024-07-13T10:00:00-04:00
categories: blogging, blogroll
---

# Blogs
I enjoy reading blogs. Unfortunately, discovering blogs isn't exactly the easiest thing to do, most of the ones I've subscribed to after finding the authors on Twitter (formerly), The Fediverse, Flipboard, and other social platforms.
A lot of the mainstream platforms tend to downrank links and there are not many platforms the open social web known for discoverability (yet).  

One possible option is to just search for them. [Marginalia](https://search.marginalia.nu/), for example, is a search engine that lets you easily find content across the indieweb.

And another option is the Blogroll.
## Blogrolls
The idea behind blogrolls is very simple: share the rss feeds you enjoy reading, forming a sort of [recommendation engine](https://bentsai.org/posts/my-recommendation-engine).

If I enjoy reading a blog the best way to find out what other blogs to read is to figure out what that author reads and read that.

## Blogrolls on Blogroll
It stands to reason that I might also enjoy reading the blogs recommended by those blogs that were recommended by the authors I read.

Unfortunately, at this point there are quite a lot of blogs adding up.
If I follow 5 blogs and each of them follow 5 blogs we're up to 25 new blogs, if each of those recommend 5 unique blogs we're up to 150 new feeds.

So let's just use a quick script to scan the blogs I follow to extract all their blogrolls.

```python
class Feed:
    url: str = None
    feed: None
    blogroll: None

    def __init__(self, url):
        self.url = url
        # URL is an xml/rss url
        self.feed = feedparser.parse(url)
        self.blogroll = self.find_blogroll()

    def find_blogroll(self):
        print(f'Checking {self.url} for blogroll link')
        # Check if blogroll link is in RSS/XML feed
        if 'source_blogroll' in self.feed.feed:
            blogroll_url = self.feed.feed['source_blogroll']
            if not blogroll_url.startswith('http'):
                blogroll_url = urllib.parse.urljoin(base_url, blogroll_url)
            return Blogroll(blogroll_url)

        # If not found in feed, check the HTML of the base_url
        base_url = urllib.parse.urlparse(self.url).scheme + '://' + urllib.parse.urlparse(self.url).netloc
        print(f"Blogroll not in RSS feed, try checking meta tags at {base_url}")

        try:
            response = requests.get(base_url)
            if response.status_code != 200:
                return None

            soup = BeautifulSoup(response.text, 'html.parser')
            blogroll_link = soup.find_all('link', rel='blogroll')
            if blogroll_link:
                # Blogroll URL may be relative or absolute
                blogroll_url = blogroll_link[0]['href']
                if not blogroll_url.startswith('http'):
                    blogroll_url = urllib.parse.urljoin(base_url, blogroll_url)
                return Blogroll(blogroll_url)
            print("No blogroll found")
        except Exception as e:
            print(e)
        return None
```

I'm not sure if there are situations where the blogroll reference shows up in the `<link>` tag but NOT in the rss feed (or vice-versa), so I added in a check for both.

So now we just loop through all the new feeds and discover their blogrolls.

```python
class Blogroll:
    url: str = None
    opml: SuperDict = None
    feeds: List[Feed] = None

    def __init__(self, url):
        self.url = url
        self.opml = lp.parse(url)

    def get_feeds(self):
        if self.feeds is None:
            self.feeds = self.set_feeds()
        return self.feeds

    def set_feeds(self):
        feeds = []
        for feed in self.opml.feeds:
            feeds.append(Feed(feed.url))
        return feeds

    def get_blogroll_tree(self, depth=0, max_depth=0, feed_scores={}):
        # Loop through all feeds in blogroll, find their blogrolls and associated feeds.
        if depth == max_depth:
            return [self]
        else:
            blogroll_tree = [self]
            for feed in self.get_feeds():
                if feed.url in feed_scores:
                    feed_scores[feed.url] += 1/(depth+1)
                else:
                    # Feed already in blogroll tree, no need to search again
                    feed_scores[feed.url] = 1/(depth+1)
                    blogroll = feed.blogroll
                    if blogroll:
                        blogroll_tree.extend(blogroll.get_blogroll_tree(depth + 1, max_depth, feed_scores))

            print(feed_scores)

            return blogroll_tree
```

## Blogrolls on Blogrolls on Blogrolls
As you can see in the above code, I've added a few arguments to our get_blogroll_tree() function.
If I assume I'll enjoy the blogs that the people I read recommend, and then to a lesser extent the blogs that are recommended on those blogs, then it follows that I might also enjoy the blogs that are recommended by the blogs that are recommended by the blogs I enjoy.

So we plug in a depth to our blogroll tree to specify how many blogs should be searched. (if I plug in 0, only my blog shows up. If I plug in 1 the blogs I recommend will appear. 2, the blogs that those blogs recommend will appear and so on)

Finally, we can assign a score to these blogs to find which ones I might most like to read. If we assume that as we get longer branches to the blogroll tree the content on the blogs further out will be 

## Further Exploration
Having a bunch of RSS feeds is only useful if I can read them. I've got a [FreshRSS](https://www.freshrss.org/) feed aggregator running on my server, which opens up a GReader API.
Using that API we can take all our new feeds and add it to a specific category on FreshRSS to be browsed at my leisure.

```python
class GReader:
    url: str = None
    api_key: str = None

    def __init__(self, url, api_key):
        self.url = url
        self.api_key = api_key

    def add_feed(self, feed: Feed, category: str):
        headers = {
            'Authorization': f'Bearer auth={self.api_key}',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        data = {
            'ac': 'subscribe',
            's': f"feed/{feed.url}",
            'a': 'user/-/label/' + category
        }

        response = requests.post(self.url, headers=headers, data=data)
        response.raise_for_status()
```
[Source Code for the Blogroll Discovery Script](https://github.com/TomCasavant/Blogroll-Discovery)

The reason I started exploring this was a discussion on [Postmarks](https://github.com/ckolderup/postmarks) about [user discovery in the fediverse](https://github.com/ckolderup/postmarks/issues/140). Mastodon still technically has a feature where users can [promote other profiles](https://docs.joinmastodon.org/user/discoverability/), though it seems to have dropped the UI for that 
so it's not clear if it's going to stick around. But if it gets [federated alongside profiles](https://github.com/mastodon/mastodon/issues/19655) it would have the potential of bringing easy blogroll-like functionality to the social web.

---
### Further Reading
If you expand on the above code you can map out the [entire blogroll network](https://alexsci.com/rss-blogroll-network/)

[Mastodon Featured Profiles](https://box464.com/posts/mastodon-featured-profiles/)

[What are blogrolls](https://blogroll.org/what-are-blogrolls/)

[Blogroll Viewier](https://browse.blogroll.social/?id=27)
