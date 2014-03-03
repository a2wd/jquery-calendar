jquery-calendar
===============

A calendar plugin for jQuery

To clone simply use:

    git clone https://github.com/a2wd/jquery-calendar.git

To use ensure you have a link to jQuery and call on an element like so:

````html
$(element).aCal();
````

Optionally, use the returned value to further manipulate the calendar object:

````html
$(element).aCal();
var aCal = $(element).data("aCal");
aCal.move(1);
````

Example html:

````html
<!DOCTYPE html>
<html>
	<head>
		<title>jQuery Calendar Plugin</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/calendar.css" rel="stylesheet" media="screen">
	</head>
	<body>
		<div id="calendar"></div>

		<!-- Javascript for jQuery, calendar plugin & initialisation -->
		<script src="js/vend/jquery.js"></script>
		<script src="js/calendar.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				$("#calendar").aCal();
				var aCal = $("#calendar").data("aCal");
				aCal.move(1);
			});
		</script>
	</body>
</html>
````
