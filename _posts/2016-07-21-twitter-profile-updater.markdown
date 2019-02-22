---
layout:     post
title:       "Twitter Profile Updater"
date:       2016-07-21 22:11:06
categories: images
image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
Recently, I have been playing around with Twython (https://twython.readthedocs.io/en/latest/), a Twitter Api wrapper for Python. I decided to write a simple script that would automatically update your profile with a new color scheme, avatar, and banner (or background). I have it changing my profile every hour. The first step was creating the App with the https://apps.twitter.com/ webpage. Which was a simple process: 1\. Navigate to https://apps.twitter.com/ 2\. Click on Create new App (and fill in required information) 3\. View your app's page and click on 'Keys and Access Tokens' 4\. Finally click 'Generate Access Keys' (At the bottom of the page) Now that we created the app, we now would have to program it. You'll need to install Twython using 'pip install twython', and then open up your preferred text editor. We will first create a class called User, in which all of our functions will be stored, then create an init function where we will authenticate the user 
    
    
     
    from twython import Twython
    class User():
        def __init__(self, app_key, app_secret, oauth_token, oauth_secret):
            self.app_key = app_key
            self.app_secret = app_secret
            self.oauth_token = oauth_token
            self.oauth_secret = oauth_secret
            self.twitter = self.Authenticate()

Next we will have to create our Authenticate function (in the User class), which will plug all of our keys into the Twython wrapper, thereby authenticating the app with Twitter. 
    
    
        def Authenticate(self):
           t = Twython(self.app_key, self.app_secret, self.oauth_token, self.oauth_secret)
           return t
    

Now that we have that out of the way, we have to create our 3 functions (inside our User class) that will control the profile of the user. Our first 'changeAvatar' will replace the avatar of the user, next the banner with 'changeBackground', and finally the color scheme with 'updateColors'. 
    
    
        def changeAvatar(self, img):
            self.twitter.update_profile_image(image = img)
    
        def changeBackground(self, img):
            self.twitter.update_profile_banner_image(banner = img)
    
        def updateColors(self, randHex):
            self.twitter.update_profile(profile_link_color = randHex)
    

This concludes our User class, next we will create our Image class (which is not necessary). Create the class, and the init function as such: 
    
    
    class Image():
        def __init__(self):
            self.images = self.collectImages()
            self.avatars = self.images[0]
            self.banners = self.images[1]
    

The next function will look into 2 different folders (that you can create now) and grab all the image files from them. Create the folder 'Avatars' and 'Banners' in the same directory as your program. This function is still in the Image class: 
    
    
        def collectImages(self):
            avatars = []
            banners = []
            for img in os.listdir('Avatars'):
                avatars.append(img)
            for img in os.listdir('Banners'):
                banners.append(img)
            return [avatars, banners]
    

The final function in the Image class is the 'randProfile' function, this will choose a random photo from each of the groups (avatars, banners) and return both to be used by the User class. 
    
    
        def randProfile(self):
            avatar = self.avatars[random.randint(0, len(self.avatars) -1)]
            banner = self.banners[random.randint(0, len(self.banners) -1)]
            return [avatar, banner]
    

We than declare our Authentication keys, which you can get from your twitter apps page (https://apps.twitter.com/). 
    
    
    access_key = "####"
    access_token = "####"
    consumer_key = "####"
    consumer_token = "####"
    

To finish out this program we need our 'main' code. Which will create our user, and change their profile. 
    
    
    if __name__ == '__main__':
        user = User(consumer_key, consumer_token, access_key, access_token)
        image = Image()
        newProf = image.randProfile()
        user.changeAvatar(open('Avatars/' + newProf[0], 'rb'))
        user.changeBackground(open('Banners/' + newProf[1], 'rb'))
        r = random.randint(0, 255)
        g = random.randint(0, 255)
        b = random.randint(0, 255)
        randHex = rgb2hex(r, g, b).replace('#', '')
        user.updateColors(randHex)
    

Now, I need to explain a few things. If you noticed at the end of the 'main' function there are 3 letters followed by a function that has not yet been imported. This is the code that randomly changes the color scheme of your profile. First it randomly chooses RGB values (or color codes), then it converts it into a Hex color code (Finally it replaces the '#' with nothing, which is required for Twython). You are going to need to install colormap with 'pip install colormap' and some users may need to follow that up with the installation of easydev, 'pip install easydev'. Now, add these imports to the top of your program, so that your import list now looks like this: 
    
    
    from twython import Twython
    import os
    import random
    from colormap import rgb2hex
    

And that is how you update your twitter profile. I will follow this up with another tutorial on creating a crontab so that your code runs automatically. Here is the complete code: 
    
    
    from twython import Twython
    import os
    import random
    from colormap import rgb2hex #install colormap and easydev
    
    class User():
    	def __init__(self, app_key, app_secret, oauth_token, oauth_secret):
    		self.app_key = app_key
    		self.app_secret = app_secret
    		self.oauth_token = oauth_token
    		self.oauth_secret = oauth_secret
    		self.twitter = self.Authenticate()
    
    	def Authenticate(self):
    		#Login to Twitter
    		t = Twython(self.app_key, self.app_secret, self.oauth_token, self.oauth_secret)
    		return t
    
    	def changeAvatar(self, img):
    		#Changes Users avatar
    		self.twitter.update_profile_image(image = img)
    
    	def changeBackground(self, img):
    		#Changes User's banner image
    		self.twitter.update_profile_banner_image(banner = img)
    
    	def updateColors(self, randHex):
    		self.twitter.update_profile(profile_link_color = randHex)
    class Image():
    	def __init__(self):
    		self.images = self.collectImages()
    		self.avatars = self.images[0]
    		self.banners = self.images[1]
    
    	def collectImages(self):
    		avatars = []
    		banners = []
    		for img in os.listdir('Avatars'):
    			avatars.append(img)
    		for img in os.listdir('Banners'):
    			banners.append(img)
    		return [avatars, banners]
    
    	def randProfile(self):
    		avatar = self.avatars[random.randint(0, len(self.avatars) - 1)]
    		banner = self.banners[random.randint(0, len(self.banners) - 1)]
    		return [avatar, banner]
    
    #Authentication Keys
    access_key = "Put your keys Here"
    access_token = "Put your keys Here"
    consumer_key = "Put your keys Here"
    consumer_token = "Put your keys Here"
    
    if __name__ == '__main__':
    	user = User(consumer_key, consumer_token, access_key, access_token)
    	image = Image()
    	newProf = image.randProfile()
    	user.changeAvatar(open('Avatars/' + newProf[0], 'rb'))
    	user.changeBackground(open('Banners/' + newProf[1], 'rb'))
    	r = random.randint(0, 255)
    	g = random.randint(0, 255)
    	b = random.randint(0, 255)
    	randHex = rgb2hex(r, g, b).replace("#", "")
    	user.updateColors(randHex)
    
    
