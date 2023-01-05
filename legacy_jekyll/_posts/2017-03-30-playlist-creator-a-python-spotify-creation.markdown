---
layout:     post
title:       "Playlist Creator&#58; A Python Spotify Creation"
date:       2017-03-30 20:25:12
categories: music
image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg

---
On my Spotify account, there is a single playlist, a playlist with 14 hours worth of music that has been accumulating for months upon months. One obvious problem with this is that I don't want to listen to all this music all the time, I should have separate playlists depending on whether I am going for a run or trying to get to sleep. That's where my python programming came in handy. A simple google search for "Spotify api" brought me to this page, <https://developer.spotify.com/web-api/>, which led me to the python wrapper Spotipy (<https://spotipy.readthedocs.io/en/latest/>). Once again you have to get all your prerequisites complete before you move onto the actual programming. So head over to <https://developer.spotify.com/my-applications/#!/applications> to get your Spotify API keys and then install via PIP the spotipy library. After those prerequisites go ahead and create your config.ini file as such: 
    
    
    [spotify]
    CLIENT_ID = SpotifyClientIDHere
    CLIENT_SECRET = SpotifyClientSecretHere
    REDIRECT_URI = SpotifyClientRedirectUrI
    

Your REDIRECT_URI will be what your app redirects to when retrieving a user's authentication. In my case, I am using my website <http://www.tomcasavant.com>. But, you can just as simply use http://localhost/ as your REDIRECT_URI. Whatever you use you must go to your app settings on Spotify and add the REDIRECT_URI to the allowed websites list. Next, you can start up a new file (mine is called main.py) to create your program. Start with all your necessary imports 
    
    
    import spotipy
    import spotipy.util as util
    from ConfigParser import SafeConfigParser
    

Next, create a User class, and all of the following methods will be constructed inside this class unless I otherwise specify. 
    
    
    class User():
    	def __init__(self):
    		parser = SafeConfigParser() #Reads config.ini file for API keys
    		parser.read("config.ini")
    		self.CLIENT_ID = parser.get('spotify', 'CLIENT_ID')
    		self.CLIENT_SECRET = parser.get('spotify', 'CLIENT_SECRET')
    		self.REDIRECT_URI = parser.get('spotify', 'REDIRECT_URI')
    		self.SCOPE = "playlist-read-private playlist-modify-private playlist-read-collaborative playlist-modify-public" #Allows program to access/edit private and public playlists
    		self.sp = self.getUser() #Creates Spotify Instance
    		self.id = self.sp.me()['id'] #Gets ID of authenticating user
    

Your parser will retrieve all your private API keys. The major bit of code in this portion is the self.SCOPE variable. In order to be allowed to access all the playlists of the authenticating user, your program must announce to Spotify what it would like access to. In this case, I chose to have the ability to read all public, private, and collaborative playlists of the user followed by allowing the program to edit all these playlists. You can look at all the possible scopes here:[ https://developer.spotify.com/web-api/using-scopes/](https://developer.spotify.com/web-api/using-scopes/) just keep in mind all the scopes are separated by spaces (not by commas or anything else) The next two methods get the user authenticated with the Spotify API 
    
    
    def getUser(self):
    	"""Creates Spotify instance for Authenticating User"""
    	token = self.getUserToken()
    	sp = spotipy.Spotify(auth=token)
    	sp.trace = False
    	return sp
    
    def getUserToken(self):
    	"""Gets authentication token from user"""
    	name = raw_input("Please enter your username: ")
    	token = util.prompt_for_user_token(username=name,scope=self.SCOPE, client_id=self.CLIENT_ID, client_secret=self.CLIENT_SECRET, redirect_uri=self.REDIRECT_URI)
    	return token
    

Basically, what this code does is ask for the username of the person accessing this, then it uses util.prompt_for_user_token(...) to get the authentication token. Back in the getUser() method the program creates a Spotify instance named sp which can be accessed with self.sp. Then we get to the interesting methods in this program: 
    
    
    def getFeatures(self, track):
    	"""Retrieves Audio features from Spotify API for a single track"""
    	features = self.sp.audio_features(track)
    	return features
    
    def getPlaylist(self):
    	"""Retrieves all playlists from authenticating user, then allows user to select one"""
    	results = self.sp.current_user_playlists()
    	for i, item in enumerate(results['items']):
    		print ("{number} {name}".format(number=i, name=item['name'].encode('utf8'))) #Prints out the name of each playlist, preceded by a number
    
    	choice = input("Please choose a playlist number: ")
    	return results['items'][int(choice)]['id']
    
    def getSongs(self, playlist_id):
    	"""Gets all songs from a chosen playlist, returns a lsit of all song ids"""
    	results = self.sp.user_playlist_tracks(self.id,playlist_id)
    	tracks = results['items']
    	song_ids = []
    	while results['next']:
    		results = self.sp.next(results)
    		tracks.extend(results['items'])
    	for song in tracks:
    		song_ids.append(song['track']['id'])
    	return song_ids
    
    

The getFeatures(self, track) function takes an argument for a track id and returns all the features of the track. Some features include danceability, loudness, and instrumentalness. All of the features can be found here: <https://developer.spotify.com/web-api/get-audio-features/> The getPlaylist(self) method goes through and prints all the playlists of the authenticating user, and the proceeds to ask the user to choose one of them as a source playlist. The getSongs(self, playlist_id) method goes through and saves the ids of all the tracks in the chosen playlist. Now we need a way to ask for all of the different preferences that the user is looking for in his/her new playlist. Which can be accomplished with a bunch of raw_input() variables as shown in this method: 
    
    
    def getLimits(self):
    	"""Asks user for the minimums and maximums for each condition, leaving a blank responistse will return the lowest or highest possible value. Then asks user to name the playlist"""
    	danceL = float(raw_input("Danceability minimum (how suitable track is for dancing 0.0-1.0): ") or "0")
    	danceH = float(raw_input("Danceability maximum: ") or "1")
    	energyL = float(raw_input("Energy minimum (intensity, or speed of a track 0.0-1.0): ") or "0")
    	energyH = float(raw_input("Energy maximum: ") or "1")
    	loudL = float(raw_input("Loudness minimum (Overall loudness of a track in decibels -60-0): ") or "-60")
    	loudH = float(raw_input("Loudness maximum: ") or "0")
    	acousticL = float(raw_input("Acousticness minimum (measure of whether a track is acoustic 0.0-1): ") or "0")
    	acousticH = float(raw_input("Acousticness maximum: ") or "1")
    	instrumentL = float(raw_input("Instrumentalness minimum (Predicts whether track contains no vocals 0.0-1.0): ") or "0")
    	instrumentH = float(raw_input("Instrumentalness maximum: ") or "1")
    	livenessL = float(raw_input("Liveness minimum (Detects presence of audience 0.0-1.0): ") or "0")
    	livenessH = float(raw_input("Liveness maximum: ") or "1")
    	valenceL = float(raw_input("Valence minimum (Positivity measurement 0.0-1.0): ") or "0")
    	valenceH = float(raw_input("Valence maximum: ") or "1")
    	name = raw_input("Please name your playlist: ")
    	return [danceL, danceH, energyL, energyH, loudL, loudH, acousticL, acousticH, instrumentL, instrumentH, livenessL, livenessH, valenceL, valenceH, name]
    

This method goes through and asks for the minimum and maximum values for each attribute (as well as a name for the new playlist). If no value is provided it just selects the lowest/highest possible value. Then it returns all of these preferences in a list. We then need a method to check the values of each song and then return the songs that fall within the limits. We also need to take all these songs and create a new playlist. 
    
    
    def sortSongs(self, songF, danceL, danceH, energyL, energyH, loudL, loudH, acousticL, acousticH, 
    	instrumentL, instrumentH, livenessL, livenessH, valenceL, valenceH):
    	"""Returns True if all conditions are met. Conditions include: Danceability, Energy, Loudness, Acousticness, Instrumentalness, Liveness, and Valence"""
    	if danceL <= songF['danceability'] <= danceH:
    		if energyL <= songF['energy'] <= energyH:
    			if loudL <= songF['loudness'] <= loudH:
    				if acousticL <= songF['acousticness'] <= acousticH:
    					if instrumentL <= songF['instrumentalness'] <= instrumentH:
    						if livenessL <= songF['liveness'] <= livenessH:
    							if valenceL <= songF['valence'] <= valenceH:
    								return True
    
    def createPlaylist(self, title, tracks):
    	"""Creates a new playlist from all tracks that met conditions"""
    	playlist = self.sp.user_playlist_create(self.id, title, False)
    	for track in tracks:
    		self.sp.user_playlist_add_tracks(self.id, playlist['id'], [track])
    	print "Playlist Created"
    

These two methods are basically self-explanatory, one verifies whether a song falls into a certain range of values. The other creates the new playlist and adds all the songs. However, one thing to note is that the second method createPlaylist(...) fills the new playlist one song at a time. The reason this was done is that Spotify only allows you a maximum of a hundred songs added at once, so I just decided to go one by one just in case the list exceeds 100 tracks. We finish this class off with our main function: 
    
    
    def main(self):
    	playlist = self.getPlaylist()
    	songs = self.getSongs(playlist)
    	newPlaylist = []
    	pref = self.getLimits()
    	for song_id in songs:
    		song = self.getFeatures([song_id])
    		if self.sortSongs(song[0], pref[0], pref[1], pref[2], pref[3], pref[4], pref[5], pref[6], pref[7], pref[8], pref[9], pref[10], pref[11], pref[12], pref[13]):
    			newPlaylist.append(song[0]['id'])
    
    	self.createPlaylist(pref[14], newPlaylist)
    

This function goes through and runs all the necessary methods in order, finishing it off by creating the new playlist. Now, all we need is for the program to start which can be completed very easily as such (This is outside of the class): 
    
    
    if __name__ == "__main__":
    	SpotifyUser = User()
    	SpotifyUser.main()
    

There's your Spotify (spotipy) app. If you wanted a playlist with high energy songs just run this script and set the minimum value for energy at something around '.7', the maximum at its default '1' and let the program do its work. All this code can be found All this code can be found on GitHub here: https://github.com/Twin802/PlaylistCreator/<https://github.com/Twin802/PlaylistCreator/>
