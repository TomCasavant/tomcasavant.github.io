---
layout:     post
title:      "NFL Win-Chain (Dijkstra's Algorithm)"
date:       2019-01-28 20:29:55
categories: algorithm


---
Last semester I was taking a course at OSU called Foundations of Software Engineering. Towards the end of the course we learned about different algorithms to find paths between different nodes on a graph. One such algorithm was called Dijkstra's algorithm. I wanted to experiment with this algorithm, so I decided to write a program that would create nodes for each of the 32 NFL teams and have them connected via the wins between them, i.e. if the Bengals beat the Steelers then the Bengals would have a line pointing from themselves towards the Steelers. 

The goal of the script was to be able to compare teams that didn't play each other during the season. For example, the Bengals and the Patriots did not play each other in the 2018 season. The shortest chain of wins between the Bengals and the Patriots was:

> Bengals -> Colts -> Redskins -> Cardinals -> 49ers -> Lions -> Patriots

Essentially, the point was so that I could brag that the Bengals were better than other teams through the teams that they beat.

The first step was to define the nodes themselves. I created a file called league.py and defined 2 classes, Team and League. 
    
    
    class Team:
            """A node, representing a team in a graph"""
            def __init__(self, name):
                    self.name = name
                    self.wins = []
                    self.seen = False
    
            def numberOfWins(self):
                    self.numWins = len(self.wins)
    
            def numberOfLosses(self):
                    self.numLosses = len(self.losses)
    
    
    
    class League:
            """ A collection of team nodes representing the league (i.e the graph of nodes)"""
            def __init__(self):
                    self.teams = []
                    self.rankedTeams = []
    
            def resetSeen(self):
                    for team in self.teams:
                            team.seen = False
    
            def getWinChain(self, team1, team2):
                    team1.seen = True
                    chain = [team1] + self.winChain(team1, team2)
                    self.resetSeen()
                    return chain

Imagine each node as a circle on a graph with arrows pointing to the teams that they beat. The picture below shows 2 teams, the Bengals and the Steelers, each with one win against each other.

![](https://media.githubusercontent.com/media/TomCasavant/tomcasavant.github.io/master/media/Diagram.png?raw=true "Bengals > Steelers")

After creating the classes we have to fill the league with all the teams in the NFL. I searched around and found an api called nflgame (<https://github.com/BurntSushi/nflgame>) that would retrieve all the data I need for this project. I then proceeded to create a file called teamCreation.py to create the teams and create an interface for the user. The first step of this file would be to create functions to retrieve the data I need and to establish the nodes. 
    
    
    import nflgame
    from league import Team, League #The classes we just created
    
    
    teams = ['ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN','DET','GB','HOU','IND','JAX','KC','LA','MIA','MIN','NE','NO','NYG','NYJ','OAK','PHI','PIT','SEA','SF','TB','TEN','WAS', 'LAC'] #Shortened names for every team in the NFL
    
    
    def getData(year, weeks):
            """Gets all the games from the given year"""
            return nflgame.games(year, week=weeks)
    
    def createLeague():
            """Creates a league object and fills it with all the nfl teams"""
            league = League()
            for team in teams:
                    league.teams.append(Team(team))
    
            return league

The next step is to set the attributes for the nodes in the graph (i.e. to read in the wins from each team). 
    
    
    def loadLeague(league, data):
            """Loads the league object with the results of all the games"""
            for game in data:
                    if (game.winner != None): #If the game as finished
                            positionw = league.positionOfTeam(game.winner)
                            positionl = league.positionOfTeam(game.loser)
                            league.teams[positionw].wins.append(league.teams[positionl])
    
    def setup():
            data = getData(2018, range(1,17))
            league = createLeague()
            loadLeague(league, data)
            return league

Then we can write a function that compares two given teams in a league.
    
    
    def compareTeams(team1, team2, league):
            """Creates a chain linking the two given teams"""
            team1Pos = league.positionOfTeam(nflgame.standard_team(team1))
            team2Pos = league.positionOfTeam(nflgame.standard_team(team2))
    
            firstTeam = league.teams[team1Pos]
            secondTeam = league.teams[team2Pos]
    
            return league.getWinChain(firstTeam, secondTeam)
    

Finally, we have to be able to have the user interface with this by giving the program 2 team names. So we finish it off with a main method:
    
    
    if __name__ == "__main__":
    
            data = getData(2018, range(1,17))
            league = createLeague()
            loadLeague(league, data)
            league.assignSOS()
            league.rankTeams()
            while True:
                    chain = compareTeams(raw_input("First Team: "), raw_input("Second Team: "), league)
                    result = ""
                    for t in chain:
                            result = result + t.name + " -> "
    
                    print result

And there we have it, we can now officially brag that the team of your choice is better than all other teams via the transitive win property. The full code can be viewed on my github at <https://github.com/TomCasavant/NFLWinChains>
