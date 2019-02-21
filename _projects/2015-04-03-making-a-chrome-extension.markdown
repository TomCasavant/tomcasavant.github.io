---
layout:     post
name:        "Making a Chrome Extension"
date:       2015-04-03 17:36:00
categories: chrome
image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
The first part of making an extension for chrome is that you need the manifest file, so create a text file and name is manifest.json The manifest file basically says what your project is all about, and different things your project needs to run. Open the manifest file in a text editor and type in the "manifest_version", you project name, it's description, and it's version...as such: 

> { "manifest_version" : 2, "name" : "Pianobar Remote", "description" : "Example chrome extension", "version" : "1.0",

Next you need to add the "browser_action" setting. This sets up your icon for the extension and the website that opens when you click on it. 

> "browser_action": { "default_icon" : "icon.png", "default_popup" : "popup.html" },

Finally, you need to setup the "permissions". Currently we have no permissions that we need so will just put in a placeholder. 

> "permissions":[ ""https://ajax.googleapis.com/" ] }

Next we will setup a simple popup.html file. 

> <html> <head> <title>Pianobar Remote </title> <p>Placeholder for the Pianobar Remote</p> </head> </html>

Finally you need to open up your chrome, click on the 3 bars, go to tools, extensions and select "Developer Mode". Click load unpacked extension and open the folder where your extension is stored.
