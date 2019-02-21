---
layout:     post
name:       "Setting up your Java IDE for &#34;Dumb&#34; phone mobile apps"
date:       2015-03-12 21:26:47
categories: apps
image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
To begin making an app for your "dumb" phone you have to setup the IDE. So you need to download the following things to your computer: 

> NetBeans - <https://netbeans.org/downloads/index.html> Make sure you choose the one that says "All" so you can get Java ME Java JDK - <http://www.oracle.com/technetwork/java/javase/downloads/index.html> Java ME SDK - [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/embedded/javame/javame-sdk/downloads/index.html "http://www.oracle.com/technetwork/java/embedded/javame/javame-sdk/downloads/index.html")

Next, we need to setup our NetBeans, open up the download file and go through the installation. While you're doing this you can also begin installing the JAVA ME SDK, by running it. When NetBeans finishes it's installation you have to open it up. Click "tools" from the top of the program, select plugins, go to the installed tab and make sure Java ME is activated. Now, click "tools" again and select "Java Platforms". Click on the Add Platform button and then choose Java ME CLDC Platform Emulator. Navigate to the directory in which you installed the Java Me SDK, click next, and then Finish. Finally you have to click "tools" and go to Plugins again. Go to the Available Plugins tab, then click on the search bar. Search for Mobility and download "Mobility" in the category "Java ME". And your IDE is now setup for Mobile Device Development.
