---
layout: layouts/home.njk
title: Running
---
# Personal Records
	<table class="activities">
		<thead>
			<tr class="activities-header">
				<th>Distance</th>
				<th>Record</th>
				<th>Pace</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1 km</td>
				<td>3:43.1</td>
				<td>5:59 /mi</td>
			</tr>
			
			<tr>
				<td>1 mi</td>
				<td>4:56</td>
				<td>4:56 /mi</td>
			</tr>
			
			<tr>
				<td>5K</td>
				<td>16:54</td>
				<td>5:47 /mi</td>
			</tr>
			
			<tr>
				<td>10K</td>
				<td>45:57</td>
				<td>7:24 /mi</td>
			</tr>
			
			<tr>
				<td>Half Marathon</td>
				<td>1:40:58</td>
				<td>7:42 /mi</td>
			</tr>
			
			<tr>
				<td>Marathon</td>
				<td>3:54:13</td>
				<td>8:56 /mi</td>
			</tr>

			<tr>
				<td>Longest Run</td>
				<td>26.2 mi</td>
				<td></td>
			</tr>

			<tr>
				<td>Most Steps in a Day</td>
				<td>73,066</td>
				<td></td>
			</tr>

			<tr>
				<td>Most Steps in a Week</td>
				<td>246,823</td>
				<td></td>
			</tr>

			<tr>
				<td>Most Steps in a Month</td>
				<td>1,000,090</td>
				<td></td>
			</tr>

			<tr>
				<td>Most Miles in 24 hours (Tomarathon)</td>
				<td>48 Miles (+2 in the 25th hour)</td>
				<td></td>
			</tr>
			
		</tbody>
	</table>
	
# Run Log
	<table class="activities">
		<thead>
			<tr class="activities-header">
				<th>Date</th>
				<th>Distance</th>
				<th>Time</th>
				<th>Pace</th>
				<th>Fastest Pace</th>
			</tr>
		</thead>
		<tbody>
			{% for activity in garmin.garminRuns %}
				<tr>
					<td>{{ activity.date }}</td>
					<td>{{ activity.distance }} mi</td>
					<td>{{ activity.duration }}</td>
					<td>{{ activity.speed }}/mi</td>
					<td>{% if activity.maxSpeed %}{{ activity.maxSpeed }} /mi{% else %}&nbsp;{% endif %}</td>
				</tr>
			{% endfor %}
		</tbody>
	</table>

# Biking Log
	<table class="activities">
		<thead>
			<tr class="activities-header">
				<th>Date</th>
				<th>Distance</th>
				<th>Time</th>
				<th>Speed</th>
			</tr>
		</thead>
		<tbody>
			{% for activity in garmin.garminBiking %}
				<tr>
					<td>{{ activity.date }}</td>
					<td>{{ activity.distance }} mi</td>
					<td>{{ activity.duration }}</td>
					<td>{{ activity.speed }} mph</td>
				</tr>
			{% endfor %}
		</tbody>
	</table>
