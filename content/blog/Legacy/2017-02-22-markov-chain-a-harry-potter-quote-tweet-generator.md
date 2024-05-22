---
title:       "Markov Chain&#58; A Harry Potter Quote/Tweet Generator"
date:       2017-02-22 22:57:58
categories: ai
#image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
I was looking into different python libraries that might be interesting to use, when I encountered the markovify library (<https://github.com/jsvine/markovify>). This library allows the programmer to simply create Markov chains from pieces of text. 

> pip install markovify

A Markov chain basically uses statistics to predict future words or letters based on previous words or letters. Say if I insert the word "trees", the markov chain would look at this word and determine the probability of each letter occurring, then it would pick a letter let's say 'e' and determine the probabilities of other letters appearing after this letter. In this case there is a 50% chance of another 'e' occurring and a 50% chance of the letter 's' occurring. You can read more about Markov chains on Wikipedia, <https://www.wikipedia.org/wiki/Markov_chain> So I decided to download the first 4 books of the Harry Potter series to see what quotes I could generate. After downloading the books, I needed a function that would pick a random book and run a Markov chain on this. 
    
    
    import markovify
    import random
    
    def createSentence():
        corpus = random.choice(['Harry1.doc', 'Harry2.doc', 'Harry3.doc', 'Harry4.doc'])
    
        with open(corpus) as f:
            text = f.read()
    
        text_model = markovify.Test(text)
        return (text_model.make_short_sentences(140))
    

Some things to note about this code, is the text_model variable and the make_short_sentences(140) method. The text_model variable is set to markovify.Test(text) which just analyzes the text file to get probabilities of each word within it. When you run make_short_sentences(140) on text_model it will create your quote using the Markov chain. The 140 is the number of characters that the chain will be limited by, 140 was chosen because that's the limit on a tweet. Executing this function will return your phrase, I got "No one would ever have been able to make his views heard.". With that function created, we'll need to create our Twitter bot. I have a pre-built class that I use for all my twitter bots. After you register your bot on <http://www.apps.twitter.com> than you can type of this code: 
    
    
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
    
    	def createSentence(self):
    		corpus = random.choice(['Harry1.doc', 'Harry2.doc', 'Harry3.doc', 'Harry4.doc'])
    		with open(corpus + ".txt") as f:
    			text = f.read()
    
    		text_model = markovify.Text(text)
    
    		return (text_model.make_short_sentence(140))
    
    	def sendTweet(self):
    		tweet = self.createSentence()
    		self.twitter.update_status(status=tweet)
    
    

This class will connect your bot to twitter, and methods such as sendTweet allow you to interface with Twitter. Finish your code off with your main function: 
    
    
    access_key = "Access Key Here"
    access_token = "Access Token Here"
    consumer_key = "Consumer Key Here"
    consumer_token = "Consumer Token Here"
    
    if __name__ == "__main__":
        user = User(consumer_key, consumer_token, access_key, access_token)
        user.sendTweet() #Creates a quote with createSentence, and updates the users status with quote
    

Fill in your apps OAuth information and you can run the program to see how it works. You can view the program in action at <https://www.twitter.com/HPNovels> (@HPNovels).
