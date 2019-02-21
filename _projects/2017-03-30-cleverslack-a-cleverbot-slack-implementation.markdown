---
layout:     post
name:       "CleverSlack&#58; A Cleverbot/Slack Implementation"
date:       2017-03-30 00:49:53
categories: chat-ai
image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
Cleverbot recently released an official API (that allows for 5,000 free requests every month) and with that, I wanted to experiment with this chat AI. I started using a website called Slack [(https://slack.com/](https://slack.com/)) which is basically an easy way to communicate in large groups. So, I decided to combine the two and create a bot that would talk to people in this group chat. Prior to programming, you have to create an API key for both Slack and Cleverbot which is quite easy. You can follow the tutorial for creating a bot user in Slack here: <https://api.slack.com/bot-users>. The Cleverbot API is located here: <https://www.cleverbot.com/api/> and all you need to do there is purchase the free API package. You will also need to install several libraries. Install slackclient and cleverwrap using pip. After generating all your API keys you can start with a config file. This, I learned, is necessary when loading sensitive information online as it keeps that data private. Python has a handy built-in library called ConfigParser that easily imports this data. Name your config file config.ini and add your API keys in there as such: 
    
    
    [slack]
    API_TOKEN = InsertSlackAPITokenHere
    [cleverbot]
    API_TOKEN = InsertCleverbotAPITokenHere
    

After creating your config file you can move on to the actual program, name it main.py (or whatever you want). You can start with your necessary imports: 
    
    
    from slackclient import SlackClient
    from cleverwrap import CleverWrap
    import time
    from ConfigParser import SafeConfigParser
    

The first two imports are the previously installed libraries slackclient and cleverwrap. The time library will be used to slow down the processing speed of the bot with its sleep method. Finally, the ConfigParser will be used to retrieve the API keys from the config.ini file. We'll start with the main function, which will connect to the Slack library and read new messages as they come in. Make sure to add your bot user to a group so it knows where to search for messages in this case I added mine to a group called #clever. 
    
    
    def main():
    	if sc.rtm_connect():
    		#sc.rtm_send_message("clever", "Bot starting up...") #Used to check if bot is working
    		while True:
    			for slack_message in sc.rtm_read():
    				message = slack_message.get("text")
    				user = slack_message.get("user")
    				if not message or not user or user == "cleverbot":
    					continue
    				#print "Got message! %s" %(message)
    				sc.rtm_send_message("#clever", "{text}".format(text=cleverbot(message)))
    
    			time.sleep(1)
    
    		else:
    			print "Connection failed"
    

This function uses the Real-time messaging method from the slackclient library which allows the bot to constantly read messages as they come in. The next few lines are rather self-explanatory, if the bot is able to connect to the server then read new messages and saves the text as well as the user of the message, if the user is not the bot itself then it sends its own message with the response that it retrieves from cleverbot(message) or the next function we will make. Then it runs time.sleep(1) so it doesn't overprocess. Next, we need to retrieve a message from cleverbot, which is surprisingly easy to do: 
    
    
    def cleverbot(text):
    	response = cw.say(text)
    	return response
    

Basically, what happens is we send the Cleverbot API a piece of text and return the response. Finally, we need to initiate all of our API keys using the ConfigParser 
    
    
    if __name__ == "__main__":
    	parser = SafeConfigParser()
    	parser.read("config.ini")
    	SLACK_API_TOKEN = parser.get("slack", "API_TOKEN")
    	CLEVERBOT_API_TOKEN = parser.get("cleverbot","API_TOKEN")
    	sc = SlackClient(SLACK_API_TOKEN)
    	cw = CleverWrap(CLEVERBOT_API_TOKEN)
    	main()
    

The parser reads using a layering system i.e. first it looks into the [slack] section to find the variable API_TOKEN and retrieves that variable. It then does that for the CLEVERBOT_API_TOKEN as well. Then it creates a SlackClient and CleverWrap instance using these API tokens. It finishes it out with the main() function which we created earlier. All this code can be found on Github here: All this code can be found on Github here: https://github.com/Twin802/CleverSlack/ During this process I also learned how to run a process in the background of your server using this command: 

> nohup python main.py &

Which logs anything printed out into nohup.out if you needed to read that. Thus you have a Cleverbot instance in your group chat to talk with.
