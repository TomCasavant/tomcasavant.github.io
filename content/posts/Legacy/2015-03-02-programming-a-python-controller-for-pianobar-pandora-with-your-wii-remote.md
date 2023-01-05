---
layout:     post
title:      "Programming a python Controller for Pianobar (Pandora) with your Wii Remote"
date:       2015-03-02 23:05:28
categories: controller
#image: https://thenextscoop.com/wp-content/uploads/2019/01/web-design-2019.jpg
---
Recently I received a raspberry pi(<http://www.raspberrypi.org/>) as a Christmas gift. Soon after I was introduced to pianobar, a terminal based Pandora (<http://pandora.com>) client for linux. After awhile I began to get annoyed by having to grab the keyboard whenever I wanted to "like" or "skip" a song. Then, I saw the wii remote. I quickly googled how to use python in conjunction with the wii remote and quickly discovered the library cwiid (<http://talk.maemo.org/showthread.php?t=60178>). First off I went through a quick tutorial to learn how to use this library. Then I set off with my program. I began with a function to find the wii remote when you make it discoverable (By clicking 1 & 2) 
    
    
    import cwiid
    if __name__ == "__main__":
        loop()
    def connectRemote():
        if not wm:
            print "Please connect your wii remote by clicking 1 & 2"
            wm = cwiid.Wiimote()
        return wm

Next I began on the main loop, this would iterate through all the command options and run the correlating command: 
    
    
    def loop():
        running = True
        while running == True:
            try:
                wm.rpt_mode = cwiid.RPT_BTN
                clicked = wm.state['buttons']
            except:
                wm = connectRemote()
         if (clicked & cwiid.BTN_A):
             control("p", wm)
         elif (clicked & cwiid.BTN_UP):
             control("))", wm)
         elif (clicked & cwiid.BTN_DOWN):
             control("((", wm)
         elif (clicked & cwiid.BTN_LEFT):
             control("n", wm)
         elif (clicked & cwiid.BTN_PLUS):
             control("+", wm)
         elif (clicked & cwiid.BTN_MINUS):
             control("t", wm)

Next, we need to make sure our pianobar is setup. First install it by typing 

> sudo apt-get install pianobar

Next we need to edit pianobar's settings. I had some trouble with this and had to copy the config file to my pianobar directory. Type: 

> sudo nano /home/pi/.config/pianobar

We then need to remove some of the "#"'s remove the "#" from "user" and "password" and after the "=" type in your pandora credentials 

> user = username@email.com
> 
> password = ***************

Then remove the "#" from the commands that you'd like to use, such as the "act_songlove" 

> act_songlove = +

Now, remove the "#" from the line that says "fifo" and change that value to: 

> fifo = /home/pi/.config/pianobar/ctl

Finally, I had some trouble with the "tls_fingerprint" in which I was not able to play music until I changed that to: 

> tls_fingerprint = B0A1EB460B1B6F33A1B6CB500C6523CB2E6EC946

Now I had to setup my "autostart" station. Save and close the config file. run pianobar by typing "pianobar" in the terminal, you might have to type "./pianobar" instead. Now select one of your stations by typing in the number of the station you prefer. It now should show a 19 digit number such as: 

> 1105372639075095905

Copy this down and go back to editing your config file. Change the "autostart_station" to equal your 19 digit number. 

> autostart_station = 1105372639075095905

Test this by running pianobar again and check if the station begins playing. To finish this setup, we need to create the fifo, navigate to your directory with the "ctl" file. If this file is not created then type sudo nano ctl and then ctl+x to save it. Now, create the fifo with: 

> mkfifo ~/.config/pianobar/ctl

Then I had to finish my python program, I needed a control() function.

Edit your python program and add:
    
    
    def control(cmd, wm):
        ctl = open("/home/pi/.config/pianobar/ctl", "w")
        print >> ctl, cmd

The final step is creating an sh file to run pianobar and your program at the same time.

Type: sudo nano launcher.sh

Add this to your file and save:

> pianobar & python yourprogram.py

Replace yourprogram.py with the name of your program.

Now type in your terminal:

> chmod +x launcher.sh

Run your program with "./launcher"
