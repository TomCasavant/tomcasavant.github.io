---
layout:     post
title:      "Generating Heat Maps from GPX Files"
date:       2019-04-18
categories: python, gpx, running, heatmaps
---

![](https://media.githubusercontent.com/media/TomCasavant/tomcasavant.github.io/master/media/heatmap.png?raw=true "Final generated heat map")

I own a smart watch (vivosport) that tracks my runs and other activities. The watch has a built-in GPS which will track my location. All of this data eventually gets transferred to Garmin, where I can view individual activities and the results of said activities.

## Getting the Garmin Activity Data

Earlier this week I became interested as to whether or not I could view all my maps as a single heat map. The search brought me to an old Garmin forums page, where I was informed that the heat map functionality had long since been removed. There were two other options I found, using Strava to generate a heat map (unfortunately, this would involve signing up for their premium summit program) or generating a heat map from a series of gpx files (gpx being the gps filetype that each activity could output). Since I didn't desire to spend any money on this project I looked into the second option.


The first issue I discovered was that, for no apparent reason, Garmin would not let me download all of my gpx files in bulk. Off I went to look for a solution to that problem (I figured, that if it comes to it I could just have a macro go through and download those for me, but that seemed inefficient). The first few github repositories I discovered just didn't work. Likely because Garmin's website security had changed in the years since those repos were created. Then I discovered [garminexport](https://github.com/petergardfjall/garminexport) which turned out to be almost exactly what I wanted. The one issue was that it would go through and download every piece of data from every activity (rather than just the gpx files) but this was definitely something I could work with. It worked immediately and as such I was onto the next step.

## Generating the Heat Map

This part proved to be more complex than I desired. I searched and searched until I came up with [this website](http://www.gpsheatmaps.com/about/) which claimed it would generate heat maps from gpx files. I took my gpx files and submitted it to the website. The first thing I noticed was that it only accepted ~50 files. Which was unfortunate because I had many hundreds of files. The next thing I noticed was that it had no options to display the heat map on an actual map, which is what I wanted. The website's about page said that the creator planned to overlay the heat maps onto Google maps. I contacted the creator and was informed that this project was abandoned and that there were no plans to update it. Darn.

That's when I decided to just make it myself. After a bit of research I decided to use the following libraries:
- [gpxpy](https://github.com/tkrajina/gpxpy) - To parse the .gpx files. (the gpx files were just glorified xml files, but this just made it easier for me)
- [click](https://github.com/pallets/click) - A library to develop an easy to use CLI for my project. Largely because I had heard about this at a recent Open Source Club meeting and I was intrigued.

Note that I didn't use a google maps libraries. This is because I decided the best course of action was to develop an html file with javascript functions for manipulating the heatmap. Most of the my html setup came from Google's [Javascript API Documentation](https://developers.google.com/maps/documentation/javascript/examples/layer-heatmap).

### The Code

The entirety of this project can be found on my github at [https://github.com/TomCasavant/GPXtoHeatmap](https://github.com/TomCasavant/GPXtoHeatmap).

The first step to this project was getting all the points from the gpx files as such:

~~~
import gpxpy
import click
import os
from configparser import SafeConfigParser

def load_points(folder, filter):
    """Loads all gpx files into a list of points"""

    coords = []
    print (f"Loading files with type {filter}...") #Loads files with progressbar
    with click.progressbar(os.listdir(folder)) as bar:
        for filename in bar:
            if (filename.endswith(".gpx")):
                #Verify file is a gpx file
                gpx_file = open(f'{folder}/' + filename)
                gpx = gpxpy.parse(gpx_file)
                for track in gpx.tracks:
                    if not filter or filter==track.type:
                        for segment in track.segments:
                            for point in segment.points:
                            	coords.append([float(point.latitude), float(point.longitude)])

    return (coords)
~~~
Things to note:
- The click library allows me to easily insert a progress bar into my project. The progress bar is used in place of the for loop. I could've placed this anywhere in the loop (i.e. I could've generated a progress bar for every track) but I figured it would be cleaner if I just had one progress bar for each file found.
- gpxpy parses the gpx file to allow me to get specific elements from the file (such as the tracks and the type)
- The filter variable will be used to filter based on the type of activity (if desired), activities can be anything that Garmin (or whatever company you associate with) tracks. I personally use mine to track the types 'walking', 'running', and 'cycling'.
- I've saved the points into a list of coordinates. These coordinates will be placed into the html file to generate the heat map.

Next, I had to create the outline for the map. I created a separate text file for this purpose:

~~~

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Heatmaps</title>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #floating-panel {
        position: absolute;
        top: 10px;
        left: 25%;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        text-align: center;
        font-family: 'Roboto','sans-serif';
        line-height: 30px;
        padding-left: 10px;
      }
      #floating-panel {
        background-color: #fff;
        border: 1px solid #999;
        left: 25%;
        padding: 5px;
        position: absolute;
        top: 10px;
        z-index: 5;
      }
    </style>
  </head>

  <body>
    <div id="floating-panel">
      <button onclick="toggleHeatmap()">Toggle Heatmap</button>
      <button onclick="changeGradient()">Change gradient</button>
      <button onclick="changeRadius()">Change radius</button>
      <button onclick="changeOpacity()">Change opacity</button>
    </div>
    <div id="map"></div>
    <script>

      // This example requires the Visualization library. Include the libraries=visualization
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

      var map, heatmap;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 40, lng: -83},
          mapTypeId: 'roadmap'
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map,
	  maxIntensity: 25,
	  radius: 5,
	  opacity:.4
        });
      }

      function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      }
     function changeGradient() {
        var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
      }

      function changeRadius() {
        heatmap.set('radius', heatmap.get('radius') ? null : 1);
      }

      function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      }

      function getPoints() {
        return [LIST_OF_POINTS];
        }
      </script>
      <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=visualization&callback=initMap"></script>
      </body>
</html>
~~~

Again, most of this file comes from Google's official documentation. It allows the user to customize their map live, in case you want to change certain aspects of it. The major value I had to change in this file was the radius. Since my heat maps were more localized, I had to decrease the radius value to 5 in order to clearly see my heatmap when zoomed in. In the INIT function, I changed where the map started, this wasn't necessary because you can move around the map when you open it. But, it made it easier to focus on where my heat map is (I may in the change where the location begins based on where the heat map is generated, but I haven't gotten around to it yet). Finally, in the getPoints() function, I have it return LIST_OF_POINTS. This value is one of the values that we'll be changing in our python file. The other value is them API key in the <script src=...> line.

Finally, we have to actually generate the completed html file. We'll need a config file and back in the python file we'll define 2 more functions: one to get the outline file and one to replace the LIST_OF_POINTS variable and generate a new file:

config.ini
~~~
[GOOGLE]
API_KEY = ####YOUR_API_KEY###
~~~

heatmap.py
~~~
parser = SafeConfigParser()
parser.read('config.ini')
API_KEY = parser.get('GOOGLE', 'API_KEY')

def get_outline():
    """Reads in the html outline file"""
    with open('map-outline.txt', 'r') as file:
        outline = file.read()
    return outline

def generate_html(points, file_out):
    """Generates a new html file with points"""
    f = open(f"output/{file_out}.html", "w")
    outline = get_outline()
    google_points = ",\n".join([f"new google.maps.LatLng({point[0]}, {point[1]})" for point in points])
    updated_content = outline.replace("LIST_OF_POINTS", google_points).replace("API_KEY", API_KEY)
    f.write(updated_content)
    f.close()
~~~

You can generate a google maps API key from here [https://developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key).

Essentially, all you need to know is that get_outline() reads in the text file containing the html/javascript, then the generate_html() function takes that outline and fills it in with the appropriate content.

Then to put it all together we make our main functions.

~~~
@click.command()
@click.option("--output", default="map", help="Specify the name of the output file")
@click.option("--input", default="gpx", help="Specify an input folder")
@click.option("--filter", default=None, help="Specify a filter type", type=click.Choice(['running', 'cycling', 'walking']))
def main(output, input, filter):
    points = load_points(input, filter)
    generate_html(points, output)

if __name__ == '__main__':
    main()
~~~

Click allows us to define arguments from the command line. In this program I added three options '--output', '--input', and '--filter'. Which means a user could type in the following command to generate a heat map with bike routes from a folder called gpx_files and output it to output/my_heat_map.html.
`python heatmap.py --output my_heat_map --input gpx_files --filter cycling`

That's it. The heat map gets generated and can be open in your web browser where you can manipulate it to your desire. Once again, all of this code can be found on my github at [https://github.com/TomCasavant/GPXtoHeatmap](https://github.com/TomCasavant/GPXtoHeatmap).
