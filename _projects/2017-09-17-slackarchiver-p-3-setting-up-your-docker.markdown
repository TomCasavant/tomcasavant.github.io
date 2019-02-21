---
layout:     post
name:      "SlackArchiver (p.3)&#58; Setting up your Docker"
date:       2017-09-17 01:34:53
categories: archive
image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
In the previous post, we set up our database to save messages from Slack. In this final post we just need to setup our Docker (<https://www.docker.com/>). The reason, that we are creating a Docker, is that this will allow you to easily transfer your program to other computers without needing to go through and install all dependencies. The first thing we're going to do is setup our filesystem to make it easy to docker it: 

  1. Create a docker-compose.yml file
  2. Create the folder "slackarchiver"
  3. Place the config.ini and main.py files inside the slackarchiver folder
  4. Inside the slackarchiver folder create a file called Dockerfile (note there is no file extension)

So now your file system should look like this: 
    
    
    MainFolder
        -docker-compose.yml
        -slackarchiver
            -config.ini
            -Dockerfile
            -main.py
    

Now edit your docker-compose.yml file to look like this: 
    
    
    version: "3.2"
    services:
     mongodb:
      image: mongo:3.4
      volumes:
       - slack-volume:/data/db
    
      slackarchiver:
       build: ./slackarchiver
    
    volumes:
     slack-volume:
    

The purpose of this file is to allow everything in your docker to communicate with each other. First, it creates a Mongo instance called mongodb (Make sure to specify the version so that nothing changes when mongo gets updated). This is linked to slackarchiver (your program), which is also specified inside the services section. The volumes section will allow your program to save data off of the docker, that way if your docker is restarted/turned off you can retrieve the data when it's turned on again. Now you need to edit your Dockerfile to look like this: 
    
    
    FROM python:2
    ADD main.py /
    
    ENV CONFIG config.ini
    ADD config.ini
    
    RUN pip install \
        configparser \
        pymongo \
        slackclient
    
    VOLUME /data/db
    CMD ["python", "./main.py"]
    

Your Dockerfile sets up your docker. The first thing it does is add your program into the docker, then it saves the config file as an environmental variable so that your program can easily access it. Next, it installs all the packages you need for your program to function (configparser, pymongo, slackclient). Then it sets up the volume for all the files to be saved to. Finally, it runs the program. After all this you need to change a few lines in your main.py file. First make sure to import os. Then change your main function: 
    
    
    if __name__= "__main__":
        parser = SafeConfigParser()
        parser.read(os.environ['CONFIG']) #THIS LINE CHANGED
        SLACK_API_TOKEN = parser.get('slack', 'API_TOKEN')
    
        mongo = MongoClient("mongodb") #THIS LINE CHANGED
        slack = SlackClient(SLACK_API_TOKEN)
        log_previous_slack_data(slack, mongo)
        start_listening(slack, mongo)
    

There were two changes made in this function. The first was the parser.read() line, we changed this to read the location of the config file from the environment variables. Finally, we changed the MongoClient() line so that we could access the mongo instance that was started by the docker. The final step is the initiation of the docker. To do this you have to follow the following steps: 

  1. Open a terminal and move into the project directory
  2. run "docker-compose build" or "sudo docker-compose build"
  3. run "docker-compose up" to run the docker

In theory, your docker should now be up and running. To test if everything is working correctly follow these steps: 
  1. Open a new terminal
  2. Run "sudo docker ps"
  3. Get the name of your docker
  4. run "docker exec -it <container name> /bin/sh" where <container name> is the name you just got.
  5. You should now be in a terminal within your docker container
  6. Run "python" and print out your database using pymongo to test if your program is functioning correctly

That's that. You should be able to transfer your docker container to any other computer and run it without errors.
