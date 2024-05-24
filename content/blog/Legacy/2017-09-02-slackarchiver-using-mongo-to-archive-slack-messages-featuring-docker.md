---
title:      "SlackArchiver&#58; Using Mongo to archive Slack messages (Featuring &#34;Docker&#34;)"
date:       2017-09-02 19:36:10
categories: archive
#image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
The purpose of this program is to read messages from Slack (<https://slack.com/>) and store them in a database using Mongo. We are also going to build all of this within a Docker, so that we can easily recreate the environment this program needs to run properly on other systems. Requirements: 

  * Install docker from <https://docs.docker.com/engine/installation/>
  * Install docker-compose from <https://docs.docker.com/compose/install/>
  * pip install pymongo
  * pip install ConfigParser
  * pip install slackclient

Make sure to install the latest version of all of the above libraries. Next we need a way to read data from our slack channels Create your main.py file and add the following imports: 
    
    
    from ConfigParser import SafeConfigParser
    import time
    from pymongo import MongoClient
    from slackclient import SlackClient
    import os
    

After importing everything you can move onto our first function "log_previous_slag_data()" which will go through all the past messages in all of your channels and will send those messages to be archived. 
    
    
    def log_previous_slack_data(slackclient, mongoclient):
        """Gets all previous messages and puts them into a mongo database"""
        channels = slackclient.api_call("channels.list")['channels']
        for channel in channels:
            history = slackclient.api_call(
                "channels.history",
                channel=channel['id'])
            print history['messages'] #This line is only for testing purposes and we'll change it later on
    

Very simply, this function takes 2 arguments: "slackclient" and "mongoclient" which we will create soon. They are used to communicate with the Slack API and the mongo API respectively. Using these arguments, the function reads the history of every channel in the list of channels. Then it prints out what it reads (we will later have this function automatically send them to be archived using the mongoclient) While it's nice to archive every message, a user doesn't want to run this program every time they'd like to archive new messages. So, we need a function at actively logs messages, this function will be called "start_listening()". 
    
    
    def start_listening(slackclient, mongoclient):
        """Actively logs messages into a mongo database"""
        if slackclient.rtm_connect():
            while True:
                messages = slackclient.rtm_read()
                if messages: #If anything was read
                    print messages #Again, this a temporary command, we will change it once we have our database setup
                time.sleep(1)
    
        else:
            print "Unable to connect"
    

Now, before we move on we should probably test our two functions to see if they do anything. Make sure you create a Slack bot user (<https://api.slack.com/bot-users>) and get yourself an API key. Then we can run these functions to see if they work: 
    
    
    if __name__ == "__main__":
        parser = SafeConfigParser()
        parser.read(config.ini) #Later on this line will change slightly
        SLACK_API_TOKEN = parser.get("slack", "API_TOKEN")
    
        mongo = MongoClient("mongodb") #This'll be explained later
        slack = SlackClient(SLACK_API_TOKEN)
    
        log_previous_slack_data(slack, mongo)
        start_listening(slack, mongo)
    

And then you'll need to create a config.ini file as such: 
    
    
    [slack]
    API_TOKEN = API_TOKEN_GOES_HERE
    

Now you can run the function and see if your messages start printing on the screen. I'll make another post later to detail setting up your database
