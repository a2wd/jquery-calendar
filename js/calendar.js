/*
** Calendar.js
**
** Custom calendar for timeshseets
** Dependencies: jQuery 2.0+
** Usage: $(element).calendar();
** or: $(element).calendar(options);
** where options is an object containing the following possible values
**
*/

(function ( $ ) {  
	/* Calendar function  */
	$.fn.calendar = function(data){

		var options = $.extend(true,{
			date: new Date(),
			style: "month",
			months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
			days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			monthsAbb: [],
			daysAbb: []
			},data);
		var output;
		var firstDay;
		var monthDays;

		function _init()
		{
			//Initialise calendar & first day variables
			output = "";
			firstDay = _firstDay();
			monthDays = _monthDays(options.date.getMonth());
			for(var i = 0; i < 12; i++)
			{
				options.monthsAbb[i] = options.months[i].substr(0,3);
			}
			for(var i=0; i<7; i++)
			{
				options.daysAbb[i] = options.days[i].substr(0,3);
			}

			//If user submitted Months or Years, convert
			//to lowercase with no s
			options.style = options.style.toLowerCase().replace(/s$/,"");
		}

		function _firstDay(date)
		{
			date = typeof date != 'undefined' ? date : options.date
			var date = new Date(date.getFullYear(), date.getMonth(), 1);
			return date.getDay();
		}

		function _monthDays(month)
		{
			daysByMonth	= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if(month === 1)
			{
				// Handle leap year
				var year = options.date.getFullYear();
				if((year % 4 === 0 && year % 100 != 0) || year % 400 === 0)
				{
					return 29;
				}
			}
			return daysByMonth[month];
		}

		function _numWeeks()
		{
		}

		function _header()
		{
			output += "<div class='aCal'><div class='acNav'>";
			
			output += "<div class='acLast'>Last</div>";
			if(options.style==="month")
			{
				output += "<div class='acDate'>" + options.months[options.date.getMonth()] + "</div>";
			}
			else if(options.style==="week")
			{
			}
			output += "<div class='acNext'>Next</div>";

			output += "</div><div class='acHead'>";
			//Could iterate with options.days.each()
			//but a for loop is faster
			for(x=0;x<7;x++)
			{
				output += "<div class='acHeadData'>" + options.days[x] + "</div>";
			}
			output += "</div>";
		}

		function _footer()
		{
			output += "</div>";
		}

		function _body()
		{
			output += "<div class='acBody'>";

			if(options.style==="month")
			{
				output += "<div class='acRow'>"
				var x=1;
				var y=1;
				while(x<firstDay)
				{
					x++;
					output += "<div class='acDay'></div>";
				}
				while(x<=7)
				{
					x++;
					output += "<div class='acDay'>";
					output += "<span class='acI'>" + y + "</span>";
					output += "</div>";
					y++;
				}
				var z = y;
				while(y<=monthDays)
				{
					if(y%7 === z)
					{
						output += "</div><div class='acRow'>";
					}
					output += "<div class='acDay'>";
					output += "<span class='acI'>" + y + "</span>";
					output += "</div>";
					y++;
				}
				output += "</div>";
			}
			else if(options.style==="week")
			{
			}

			output += "</div>";
		}

		_init();
		_header();
		_body();
		_footer();

		//Return calendar via this so jQuery can chain the function 
		this.html(output);
	};
}(jQuery));
