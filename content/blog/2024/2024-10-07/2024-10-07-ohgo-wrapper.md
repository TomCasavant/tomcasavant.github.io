---
layout:     /layouts/post
title:      "OHGO Wrapper"
subtitle:   "A python wrapper for the OHGO API and a traffic camera bot"
date: 2024-10-07T20:00
categories: mastodon, ohio, python, json
---

# OHGO Wrapper

One of the problems I have with a lot of my Open Source projects is the code tends to be difficult to use in alternative projects
because the classes end up blending into each other until it makes zero sense to pull out any of the code. So, for a project I'm actively working on
I made concerted effort to abstract the code enough to be useful to other people. 

The project is a wrapper for the Ohio Department of Transportation's [OHGO API](https://dev.api.ohgo.com/). The API is a JSON REST API that provides access to traffic cameras, weather sensors, incidents, closures, and delays in the state of Ohio. I found a [fantastic guide](https://www.pretzellogix.net/2021/12/08/how-to-write-a-python3-sdk-library-module-for-a-json-rest-api/)
that goes through the basic process of organizing a wrapper. And I was able to turn it into a useful package that I [published on pypi](https://pypi.org/project/ohgo/).

Getting started with the wrapper is simple, for example this is how you grab images from a traffic camera (after you install via pip):
```python
from ohgo import OHGOClient

client = OHGOClient('your-api-key')
cameras = client.get_cameras() # -> Returns a list of first 500 cameras in Ohio, pass in a QueryParams object with page_all=True to get all cameras

# Or if you prefer to get a specific group of cameras we can filter it further
from ohgo.models import QueryParams
from ohgo.types import Region
params = QueryParams(region=Region.COLUMBUS) # -> Returns a list of cameras in Columbus
cameras = client.get_cameras(params)

# Now we can get the image from the camera
camera = cameras[0]
image = client.get_images(camera) # -> Returns a list of PIL images from the camera
```

Something I didn't know before this, is that we can overload functions in python3 (so they behave differently depending on the arguments passed in).
So, I used that to make the `get_image` and `get_images` functions behave differently depending on if you pass in a Camera, CameraView, or a DigitalSign object.

That guide also led me to the [Quicktype](https://quicktype.io/) website which lets you pass in JSON, and it will generate a Python class for you (or nearly any other language) that matches the provided JSON.

I also wanted to build a small demo for the wrapper, so I made a Mastodon api compatible bot that posts a random traffic camera image every hour which you can find here: [@ohgo@tomkahe.com](https://tomkahe.com/@ohgo)

[OHGO Wrapper Source Code](https://github.com/TomCasavant/ohgo-wrapper/)
[OHGO Wrapper PyPi](https://pypi.org/project/ohgo/)
[OHGO Mastodon Bot Source Code](https://github.com/TomCasavant/ohgo-mastodon-example/)


