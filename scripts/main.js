var crimetypes = ["BURG - AUTO", "DOMESTIC VIOLENCE", "STOLEN VEHICLE", "PETTY THEFT", "VANDALISM", "MISDEMEANOR ASSAULT", "DRUNKENNESS", "DUI", "DISORDERLY CONDUCT", "THREATS", "FELONY ASSAULT", "ROBBERY", "ARSON", "BURG - COMMERCIAL", "RECOVERED O/S STOLEN", "NARCOTICS", "", "BURG - RESIDENTIAL", "WEAPONS", "GRAND THEFT", "STOLEN AND RECOVERED VEHICLE", "OTHER", "FRAUD", "EMBEZZLEMENT", "BRANDISHING", "BURG - OTHER", "PROSTITUTION", "INCIDENT TYPE", "RECOVERED VEHICLE - OAKLAND STOLEN", "TOWED VEHICLE", "CHILD ABUSE", "HOMICIDE", "MISCELLANEOUS TRAFFIC CRIME", "POSSESSION - STOLEN PROPERTY", "FORGERY & COUNTERFEITING", "MISDEMEANOR WARRANT"];

$(function(){
	$.get('./data/crimeoak90days.csv', function(response){
		var res = Papa.parse(response);
		var crimes = res.data;

		var typeMap = {};
		crimetypes.forEach(function(type){
			typeMap[type] = 0;
		});

		// loop over 10560 records (ignore first row)
		for(var i = 1; i < res.data.length; i++){
			var curr = res.data[i];

			// type of crime
			var type = curr[0];

			// add crimetype if unique (used to init populate var crimetypes)
			// if(!_.includes(crimetypes, type)){
			// 	crimetypes.push(type);
			// }

			// get number of crimes for each crimetype
			typeMap[type] += 1;


		}

		// Radar Chart
		var data = {
		    labels: crimetypes,
		    datasets: [
		        {
		            label: "Oakland Crimes Past 90 Days",
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
		var ctx = $("#radarChart").get(0).getContext("2d");
		var myRadarChart = new Chart(ctx).Radar(data, {});
	});

});





// get number of crimes for each policebeat

// get number of crimes for each datetime