---
layout: layouts/home.njk
eleventyNavigation:
  key: Running
  order: 3
---
# Run Log
	<table class="activities">
		<thead>
			<tr class="activities-header">
				<th>Date</th>
				<th>Distance</th>
				<th>Time</th>
				<th>Pace</th>
			</tr>
		</thead>
		<tbody>
			{% for activity in garmin.garminRuns %}
				<tr>
					<td>{{ activity.date }}</td>
					<td>{{ activity.distance }} mi</td>
					<td>{{ activity.duration }}</td>
					<td>{{ activity.speed }}/mi</td>
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

# Personal Records
