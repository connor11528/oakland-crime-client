var crimetypes = ["BURG - AUTO", "DOMESTIC VIOLENCE", "STOLEN VEHICLE", "PETTY THEFT", "VANDALISM", "MISDEMEANOR ASSAULT", "DRUNKENNESS", "DUI", "DISORDERLY CONDUCT", "THREATS", "FELONY ASSAULT", "ROBBERY", "ARSON", "BURG - COMMERCIAL", "RECOVERED O/S STOLEN", "NARCOTICS", "", "BURG - RESIDENTIAL", "WEAPONS", "GRAND THEFT", "STOLEN AND RECOVERED VEHICLE", "OTHER", "FRAUD", "EMBEZZLEMENT", "BRANDISHING", "BURG - OTHER", "PROSTITUTION", "INCIDENT TYPE", "RECOVERED VEHICLE - OAKLAND STOLEN", "TOWED VEHICLE", "CHILD ABUSE", "HOMICIDE", "MISCELLANEOUS TRAFFIC CRIME", "POSSESSION - STOLEN PROPERTY", "FORGERY & COUNTERFEITING", "MISDEMEANOR WARRANT"];
var policebeats = ["30Y", "26Y", "33X", "27Y", "34X", "32X", "03X", "17Y", "27X", "16Y", "23X", "15X", "31X", "20X", "30X", "12Y", "25X", "06X", "02Y", "01X", "17X", "31Y", "04X", "12X", "25Y", "35X", "02X", "21X", "03Y", "19X", "32Y", "18Y", "31Z", "05X", "", "16X", "14Y", "13Z", "10X", "24Y", "28X", "24X", "22X", "26X", "21Y", "05Y", "08X", "29X", "22Y", "09X", "10Y", "18X", "07X", "13X", "13Y", "14X", "11X", "35Y", "5X", "2Y", "9X", "77X", "3", "99X", "06", "PDT2", "7X", "PCW", "33Y", "UNK", "4X", undefined];

$(document).ready(function(){
	$.get('./data/crimeoak90days.csv', function(response){
		var res = Papa.parse(response);
		var crimes = res.data;
		
		var typeMap = {};
		crimetypes.forEach(function(type){
			typeMap[type] = 0;
		});

		var beatMap = {};
		policebeats.forEach(function(beat){
			beatMap[beat] = 0;
		});

		var dateMap = {};

		var dates = [];

		// loop over 10560 records (ignore first row)
		for(var i = 1; i < res.data.length; i++){
			var curr = res.data[i];

			// crimes by type
			var type = curr[0];
			typeMap[type] += 1;

			// crimes by policebeat
			var beat = curr[4];
			beatMap[beat] += 1;

			// date of crime
			var date;
			try {
				date = curr[1].split(' ')[0]
			} catch (e){
				date = undefined;
			}

			// create date map
			if(!_.includes(dates, date)){
				dates.push(date);
				dateMap[date] = 0;
			}

			// one crime happened on that day
			dateMap[date] += 1;

		}

		console.log(dateMap);
		/////////////////////////////////

		// Radar Chart - crimes by type
		var radarData = {
		    labels: crimetypes,
		    datasets: [
		        {
		            label: "Oakland Crimes Past 90 Days by Crime Type",
		            fillColor: "rgba(151,187,205,0.2)",
            		strokeColor: "rgba(151,187,205,1)",
            		pointColor: "rgba(151,187,205,1)",
            		pointStrokeColor: "#fff",
            		pointHighlightFill: "#fff",
            		pointHighlightStroke: "rgba(151,187,205,1)",
		            data: _.values(typeMap)
		        }
		    ]
		};
		var radar = $("#radarChart").get(0).getContext("2d");
		var myRadarChart = new Chart(radar).Radar(radarData, {});

		// Bar Chart - number of crimes in each beat
		var barData = {
		    labels: policebeats.sort(),
		    datasets: [
		        {
		            label: "Oakland Crimes Past 90 Days by Police Beat Totals",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: _.values(beatMap)
		        }
		    ]
		};
		var bar = $("#barChart").get(0).getContext("2d");
		var myBarChart = new Chart(bar).Bar(barData, {});

		// Line Chart - crimes by date
		var lineData = {
		    labels: _.keys(dateMap),
		    datasets: [
		        {
		            label: "Oakland Crimes over Time",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: _.values(dateMap)
		        }
		    ]
		};
		var line = $("#lineChart").get(0).getContext("2d");
		var myLineChart = new Chart(line).Line(lineData, {});
	});

});



// get number of crimes for each datetime