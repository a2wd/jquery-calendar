/*
** Calendar.js
**
** Custom calendar for timeshseets
** Dependencies: jQuery 2.0+
** Usage: $(element).aCal();
** or: $(element).aCal(options);
** where options is an object containing the following possible values
**
*/

(function ( $ ) {  

	var aCal = function(element, options){
		this.init(element, options);
	};

	aCal.prototype = {
		constructor: aCal,
		init: function(element, options){

			this.$element = $(element);
			this.options = options;

			//Initialise calendar & first day variables
			this.firstDay = this._firstDay();
			this.monthDays = this._monthDays();
			this.numWeeks = this._numWeeks();
			this.today = new Date();

			for(var i = 0; i < 12; i++)
			{
				this.options.monthsAbb[i] = this.options.months[i].substr(0,3);
			}
			for(var i=0; i<7; i++)
			{
				this.options.daysAbb[i] = this.options.days[i].substr(0,3);
			}

			//If user submitted Months or Years, convert
			//to lowercase with no s
			this.options.style = this.options.style.toLowerCase().replace(/s$/,"");
			this.$element.html(this.getCal());
			this._addClick();
		},

		destroy: function(){
			this.$element.removeData("aCal");
			this._removeClick();
		},

		click: function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.id == "acLast")
			{
				this.move(-1);
			}
			else if(e.target.id == "acNext")
			{
				this.move(1);
			}
			else if(e.target.id == "acNow")
			{
				this.move();
			}
			else if(e.target.className === "acDay" || e.target.className === "acI" || e.target.className === "acToday")
			{
				console.log(e.target.innerText);
			}
		},

		_addClick: function(){
			var self = this;
			this.$element.on("click", ".aCal", $.proxy(this.click, this));
		},

		_removeClick: function(){
			this.$element.off("click", ".aCal", this.click);
		},

		_firstDay: function(date){
			date = typeof date != 'undefined' ? date : this.options.date;
			date = new Date(date.getFullYear(), date.getMonth(), 1);
			//Transform sunday=0 to sunday=7 for days[] array
			date = (date.getDay()==0) ? 7 : date.getDay();
			return date;
		},

		_monthDays: function(m)
		{
			if(typeof m != "number" || (m<0 || m>12))
			{
				m = this.options.date.getMonth();
			}
			var daysByMonth	= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if(m === 1)
			{
				// Handle leap year
				var year = this.options.date.getFullYear();
				if((year % 4 === 0 && year % 100 != 0) || year % 400 === 0)
				{
					return 29;
				}
			}
			return daysByMonth[m];
		},

		_numWeeks: function(){
			var i = this.monthDays + this.firstDay;
			return Math.ceil(i/7);
		},

		_header: function(){
			var output = "<div class='aCal'><div class='acNav'>";

			output += "<div class='acLast' id='acLast'><</div>";
			if(this.options.style==="month")
			{
				output += "<div class='acDate'><span class='acJ'>";
				output += this.options.months[this.options.date.getMonth()];
				output += "</span><span class='acY'>";
				output += this.options.date.getFullYear();
				output += "</span></div>";
			}
			else if(this.style==="week")
			{
			}
			output += "<div class='acNow' id='acNow'>Now</div>";
			output += "<div class='acNext' id='acNext'>></div>";

			output += "</div><div class='acHead'>";
			//Could iterate with options.days.each()
			//but a for loop is faster
			for(x=0;x<7;x++)
			{
				output += "<div class='acHeadData'>" + this.options.daysAbb[x] + "</div>";
			}
			output += "</div>";

			return output;
		},

		_footer: function(){
			var output = "</div>";
			return output;
		},

		_body: function(){
			//Date format from mySQL:
			//2014-02-10 09:21:04
			//Transform for hours and days
			var events = JSON.stringify(this.options.events) === "{}" ? null : this.options.events;

			var output = "<div class='acBody'>";
			var todayMonth = this.today.getMonth(), dateMonth = this.options.date.getMonth();
			var todayYear = this.today.getFullYear(), dateYear = this.options.date.getFullYear();
			var todayDate = this.today.getDate();
			var d = (todayMonth === dateMonth) && (dateYear === todayYear) ? todayDate : 0;
			//Transform dateMonth for two digit style
			dateMonth = (++dateMonth < 10) ? "0" + dateMonth : dateMonth;

			if(this.options.style==="month")
			{
				var divClasses = "acRow " + this.options.weeksClasses[this.numWeeks-4];
				output += "<div class='"+ divClasses + "'>";

				var x=1;
				var y=1;
				//Event class, colour for event
				var eClass = "";

				while(x<this.firstDay)
				{
					x++;
					output += "<div class='acBlank'></div>";
				}
				while(x<=7)
				{
					if(events)
					{
						var yy = y < 10 ? "0" + y : y;
						var eDate = dateYear + "-" + dateMonth + "-" + yy;
						if(this.options.events[eDate])
						{
							eClass = this.options.events[eDate];
						}
						else
						{
							eClass = "";
						}
					}
					x++;
					output += "<div class='acDay " + eClass + "'>";
					output += (y===d) ?  "<span class='acToday'>" : "<span class='acI'>";
					output += y + "</span>";
					output += "</div>";
					y++;
				}
				//The remainder for calculating end of week
				var z = y%7;

				while(y<=this.monthDays)
				{
					if(events)
					{
						var yy = y < 10 ? "0" + y : y;
						var eDate = dateYear + "-" + dateMonth + "-" + yy;
						if(this.options.events[eDate])
						{
							eClass = this.options.events[eDate];
						}
						else
						{
							eClass = "";
						}
					}
					if(y%7 === z)
					{
						output += "</div><div class='"+ divClasses + "'>";
					}
					output += "<div class='acDay " + eClass + "'>";
					output += (y===d) ?  "<span class='acToday'>" : "<span class='acI'>";
					output += y + "</span>";
					output += "</div>";
					y++;
				}
				output += "</div>";
			}
			else if(this.options.style==="week")
			{
			}

			output += "</div>";
			return output;
		},

		getCal: function(){
			return this._header() + this._body() + this._footer();
		},

		move: function(d){
			if(typeof d === "number")
			{
				//Change the date
				var month = this.options.date.getMonth();
				var year = this.options.date.getFullYear();

				this.options.date = new Date(year, month+d);

			}
			else if(typeof d === "undefined")
			{
				//Go to today
				this.options.date = new Date();
			}
			//Initialise calendar & first day variables
			this.firstDay = this._firstDay();
			this.monthDays = this._monthDays();
			this.numWeeks = this._numWeeks();

			this.$element.html(this.getCal());
		}
	}

	$.fn.aCal = function(option, val)
	{
		return this.each(function(){
			var $this = $(this),
			data = $this.data("aCal"),

			options = typeof option === "object" && option;
			if(!data)
			{
				$this.data('aCal', (data = new aCal(
					this, $.extend({}, $.fn.aCal.settings, options))));
			}
			if(typeof option === "string")
			{
				data[option](value);
			}
		});
	};

	$.fn.aCal.settings = {
		date: new Date(),
		style: "month",
		months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
		days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		monthsAbb: [],
		daysAbb: [],
		weeksClasses: ["ac4rows", "ac5rows", "ac6rows"],
		events: {}
	};

	$.fn.aCal.Constructor = aCal;

}(jQuery));
