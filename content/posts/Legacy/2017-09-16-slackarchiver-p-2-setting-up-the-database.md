---
layout:     post
title:      "SlackArchiver (p.2)&#58; Setting up the Database"
date:       2017-09-16 17:57:25
categories: archive
#image: htt://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
In the previous post, we developed a program that can read all previous slack posts, as well as actively listen for current slack posts. Now, we need to create a new function that will take all the data it reads, and put it into a database (we'll be using Mongo as our database manager). This function is actually quite simple, it opens the database, then for every slack post it was given it will check to see if that post is already in the database. If it isn't in the database it will add it to the database. Here is that function: 
    
    
    def insert_database(messages, client):
        """Takes messages and inserts them into a database"""
        database = client['Slack-Database']
        posts = database.posts
        for message in messages:
            if message['type'] == 'message': #verifies the type of data received from slack
                posts.replace_one(message, message, upsert=True)
                print "Message Logged"
    

The biggest thing to note about this function is the fact that we used "posts.replace_one()". This allows us to only have one copy of each unique message in our database. In order to actually have access to a database, we need a Mongo service running. This is rather simple using Docker. Using the information from this website, <https://hub.docker.com/_/mongo/>, we can create a mongo instance by running the following command: 
    
    
    docker run --name some-mongo -d mongo

This will create a mongo instance within our docker called "some-mongo" (You can change that name if you'd like, but it doesn't really matter for uthe purposes of this program). Next, you need to go back and edit some of the functions from the previous part of this tutorial. The following functions should now look like these: 
    
    
    def log_previous_slack_data(slackclient, mongoclient):
        """Gets all previous messages and puts them into a mongo database"""
        channels = slackclient.api_call("channels.list")['channels']
        for channel in channels:
            history = slackclient.api_call(
                "channels.history",
                channel=channel['id'])
            insert_database(history['messages'], mongoclient) ###THIS LINE CHANGED
    
    
    
    def start_listening(slackclient, mongoclient):
        """Actively logs messages into a mongo database"""
        if slackclient.rtm_connect():
            while True:
                messages = slackclient.rtm_read()
                if messages: #If anything was read
                    insert_database(messages, mongoclient) ###THIS LINE CHANGED
                time.sleep(1)
    
        else:
            print "Unable to connect"
    
    
    
    if __name__ == "__main__":
        parser = SafeConfigParser()
        parser.read(config.ini) #Later on this line will change slightly
        SLACK_API_TOKEN = parser.get("slack", "API_TOKEN")
    
        mongo = MongoClient() #Notice how we're temporarily removing 'mongodb'
        slack = SlackClient(SLACK_API_TOKEN)
    
        log_previous_slack_data(slack, mongo)
        start_listening(slack, mongo)
    

Here's a quick explanation of the changes that occurred in these functions. In the first function (log_previous_slack_data()) we stopped printing the history, and instead sent all the data over to the insert_database function. A similar thing happened with the start_listening function. We stopped printing all the messages, and instead sent them over to the insert_database function. The major change occurred in the main function. Pymongo will connect to the Mongo instance by using the default settings of MongoClient(). This will change once we set up the docker. You can now test this program, to do this we'll create another function that will print out data from the database after it has been read. 
    
    
    def print_database(client):
        """Prints the content of the database"""
        database = client['Slack-Database']
        collection = database['posts']
        find_all = collection.find({})
        for document in find_all:
            print document
    

Finally, add print_database to your main function using "print_database(mongo)" and run your program. You should see every post in your database getting printed out. This concludes the database portion of the tutorial. In the next post we'll set up a docker to encapsulate the entire program.
