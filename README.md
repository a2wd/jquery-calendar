jquery-calendar
===============

A calendar plugin for jQuery

To clone simply use 'git clone' 



To use ensure you have a link to jQuery and call on an element like so:

$(element).aCal();

Optionally, use the returned value to further manipulate the calendar object:

var calendar = $(element).aCal();
calendar.move(1);

Example html:

<!DOCTYPE html>
<html>
	<head>
		<title>jQuery Calendar Plugin</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/calendar.css" rel="stylesheet" media="screen">
	</head>
	<body>
		<div class="calendar"></div>

		<!-- Javascript for jQuery, calendar plugin & initialisation -->
		<script src="js/vend/jquery.js"></script>
		<script src="js/calendar.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				var calendar = $(".calendar").aCal();
			});
		</script>
	</body>
</html>
