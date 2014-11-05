var API_URL = 'http://oakland-crime.herokuapp.com';
var oakland = { lat: 37.807314, lng: -122.271371 };

var policeBeats = ["23X","02X","","22X","03X","99X","03Y","30Y","01X","29","25Y","27Y","34X","30X","10X","16X","24X","18Y","02Y","29X","21Y","04X","20X","26Y","26X","08X","32X","25X","27X","12Y","07X","19X","35X","17X","11X","28X","22Y","33X","26","21X","06X","17Y","24Y","18X","31Y","05X","14X","14Y","32Y","31X","31Z","24","09X","12X","77X","13Z","10Y","13Y","35Y","13X","15X","16Y","05Y","23","21","30","35","18","27","28","20","19","34","15","11","31","03","32","07","08","33","10","8","PDT2","1","13","2","4","22","12","04","06","17","5","02","7","05","16","14","01","6","3","09","25","9","4Y","19Y","15Y","20Y","99x","BERKELEY","LKM1","77x","113Z","88X","B99X","21Z","33O","33Y","327","94605","08Y","1L28","PCW","37Y","45Y","02 X","17 Y","21 Y","O","00","29Y","30 X","27 Y","107","23Y","P3","77XINC"];

$(function(){
	// var map = L.map('map-canvas').setView([oakland.lat, oakland.lng], 4);

	// L.tileLayer('http://{s}.tiles.mapbox.com/{id}/{z}/{x}/{y}.png', {
	//     id: 'examples.map-20v6611k',
	//     attribution: 'Someone else tile layer'
	// }).addTo(map);

	// L.geoJson(statesData).addTo(map);

	$.get(API_URL + '/api/crimeTotals', function(totals){
		console.log(totals);
		var beats = totals.beats;
		console.log(beats)
	});

	_.map(policeBeats, function(beat){
		$('#' + beat).on('click', function(){
			console.log('request to: ' + API_URL + '/api/beat/' + beat);
			// giant request. HELLA slow
			$.get(API_URL + '/api/beat/' + beat, function(data){
				$('#current-beat').append(data);
			});
		});
	});
});


