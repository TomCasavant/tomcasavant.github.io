---
layout:     post
title:       "AutoTLDR&#58; Summarizing News on Twitter"
date:       2017-04-05 23:24:20
categories: news
image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
On Reddit, there is a bot named autotldr (<https://www.reddit.com/user/autotldr>) who uses one of the various text summarizer websites (i.e. <http://textsummarization.net/text-summarizer>) to simplify different news articles posted on Reddit in a few sentences. This intrigued me, so I looked into it and there is, in fact, a Python library that allows you to summarize articles very easily called sumy (https://pypi.python.org/pypi/sumy). Install with "pip install sumy" The Twython Library (pip install Twython) also interfaces with the Streaming API from Twitter, and API which lets me read tweets in real time. This is what we'll be using to create our AutoTLDR twitter account. Obviously, first you have to get your Twitter app credentials from <https://dev.twitter.com/> and then create your config.ini file: 
    
    
    [twitter]
    API_KEY = ###API KEY HERE###
    API_SECRET = ###API SECRET HERE###
    ACCESS_TOKEN = ###ACCESS TOKEN HERE###
    ACCESS_SECRET = ###ACCESS SECRET HERE###
    

Then onto your main.py file, we'll start with the imports: 
    
    
    from sumy.parsers.html import HtmlParser
    from sumy.nlp.tokenizers import Tokenizer
    from sumy.summarizers.lex_rank import LexRankSummarizer as Summarizer
    from sumy.nlp.stemmers import Stemmer
    from sumy.utils import get_stop_words
    from ConfigParser import SafeConfigParser
    from twython import TwythonStreamer
    from twython import Twython
    

Basically here you're just importing your necessary sumy modules, followed by your ConfigParser, and finally everything you need from your Twython library. After importing everything you can start a class for your Twython Streaming API as such: 
    
    
    class myStreamer(TwythonStreamer):
    	def on_success(self, data):
    		"""If data received, check if this is an original tweet from one of chosen news sources, then reply"""
    		if 'text' in data:
    			try:
    				if not data['retweeted'] and not data['in_reply_to_status_id'] and '@' not in data['text'] and not data['is_quote_status']:
    					reply(data['entities']['urls'][0]['expanded_url'], data['id'], data['user']['screen_name'])
    				#	print "Responded"
    				#	print data
    			except:
    				pass
    	def on_timeout(self, data):
    		print "Timeout"
    	def on_error(self, status_code, data):
    		print status_code
    

The first function on_success(self, data) is what the Streamer will run whenever it is successful in retrieving data from the Twitter API. First, we check if the data received is a tweet by checking if the 'text' key is in data. Next, we verify that the tweet is not a retweet/reply/or quote. After verifying all these conditions the bot will run the reply function (we'll program this soon). The on_timeout(self, data) function is run if the Streamer is timed out (currently the bot just prints that there was a timeout, but you could insert code that restarts the Streamer). Finally, the on_error(self, status_code, data) just prints out if any other error is reached. Next, we can program our reply function like this: 
    
    
    def reply(url, id, screen_name):
    	"""Replies to a tweet with summary given id"""
    	#print id
    	summary = getSummary(url, 3)
    	split = splitText(summary, 140) #Splits text every 140 characters
    	id = twitter.update_status(status="@"+ screen_name + " Here is a short summary of the posted link:", in_reply_to_status_id=id)['id'] #Posts initial tweet and saves ID
    	for segment in split:
    		#Send tweet for every 140 characters in reply format
    		id = twitter.update_status(status=segment, in_reply_to_status_id=id)['id']
    

The reply(url, id, screen_name) function uses the Twitter Rest API (in the Twython library) to reply to the original tweet with a series of tweets about the article. First, it retrieves a summary using the url from the tweet with the function getSummary (which we will soon create). Then it splits the text every 140 characters using another function splitText (again, we will create this). Then it replies to the original tweet with " Here is a short summary of the posted link:". Note: when posting a reply to a tweet you not only have to include the id with "in_reply_to_status_id" but you also have to tag the user with the "@" symbol. TO finish it off, the function loops through the sentence list in the variable 'split' and replies to the previous tweet. The next two functions deal with retrieving the split sentences: 
    
    
    LANGUAGE = "english"
    
    def getSummary(url, sentences):
    	"""Gets summary of article using sumy""" 
    	parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
    	stemmer = Stemmer(LANGUAGE)
    
    	summarizer = Summarizer(stemmer)
    	summarizer.stop_words = get_stop_words(LANGUAGE)
    	fullText = ""
    	for sentence in summarizer(parser.document, sentences):
    		fullText += str(sentence) + " "
    
    	return fullText
    
    def splitText(text, n):
    	"""Splits text every n characters"""
    	newText = []
    	while text:
    		newText.append(text[:n])
    		text = text[n:]
    	return newText 
    

The getSummary(url, sentences) function examines the url. Then it constructs a string from all of the sentences and returns that variable (fullText). The splitText function will take the string and break it into sentences of 'n' length. In our case, it splits every 140 characters. We finish the program off by calling all of the important functions: 
    
    
    if __name__ == '__main__':
    	parser = SafeConfigParser()
    	parser.read("config.ini")
    	API_KEY = parser.get('twitter', 'API_KEY')
    	API_SECRET = parser.get('twitter', 'API_SECRET')
    	ACCESS_TOKEN = parser.get('twitter', 'ACCESS_TOKEN')
    	ACCESS_SECRET = parser.get('twitter', 'ACCESS_SECRET')
    
    	twitter = Twython(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_SECRET)
    	stream = myStreamer(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_SECRET)
    	stream.statuses.filter(follow=['5392522', '612473', '5402612','742143','5741722'], filter_level='low') #Reads from certain Twitter Accounts (@NPR, @BBC, @BBCNews...)
    

First, we obtain the API keys from our config file using SafeConfigParser, then we create a twitter instance and a streamer instance. The Streamer uses the "follow=" argument to follow certain accounts. You can obtain these id's using your own code, but I found it much easier to just go to <http://mytwitterid.com/> and enter the username of the account you'd like the bot to keep track of. In my case, I followed NPR, BBC, and BBCNews (as well as a few others I can't remember off the top of my head). Now you can run your program in the background (if you're on a UNIX system) using "nohup python main.py &". My twitter account is currently active here: <https://twitter.com/auto_tldr> (@auto_tldr) You can view all this code on Github here: <https://github.com/Twin802/AutoTLDR>
