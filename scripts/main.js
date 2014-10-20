var oakland = { lat: 37.807314, lng: -122.271371 };
var API_URL = 'http://oakland-crime.herokuapp.com';
var start_date = moment('2013-10-01');
var end_date = moment('2013-10-31');
var $crime_type = $('input[name="crime_type"]');
var $date_range = $('input[name="date_range"]');

// development
API_URL = 'http://localhost:8080';

$(function(){
	// load map
	var map_container = initialize_map();

	get_crime_categories().then(function(categories){
		// populate categories
		var num_categories = categories.length;
		var random1 = Math.floor(Math.random() * (num_categories - 0 + 1)) + 0;
		var random2 = Math.floor(Math.random() * (num_categories - 0 + 1)) + 0;
		var random3 = Math.floor(Math.random() * (num_categories - 0 + 1)) + 0;

		$crime_type.tagsinput('add', categories[random1]);
		$crime_type.tagsinput('add', categories[random2]);
		$crime_type.tagsinput('add', categories[random3]);

		// typeahead and suggestion engine
		// var category_suggestions = new Bloodhound({
		// 	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		// 	queryTokenizer: Bloodhound.tokenizers.whitespace,
		// 	local: $.map(categories, function(category) { 
		// 		console.log(category);
		// 		return { value: category }; 
		// 	})
		// });
		// category_suggestions.initialize();

		// $crime_type.typeahead({
		// 	hint: true,
		// 	highlight: true,
		// 	minLength: 1
		// }, {
		// 	name: 'category_suggestions',
		// 	displayKey: 'value',
		// 	source: category_suggestions.ttAdapter()
		// });

	}, function(err){
		console.log('oh shit')
	});

	$date_range.daterangepicker({
		format: 'YYYY-MM-DD',
		startDate: start_date,
		endDate: end_date,
		showDropdowns: true
		// ranges:,
		// minDate:,
		// maxDate:,
		// dateLimit:
	});

	update_date_range();

	var CURRENT_CRIMES;

	// LISTENERS
	// date 'apply' button clicked
	$date_range.on('apply.daterangepicker', function(e, picker){
		var start = picker.startDate.format();
		var end = picker.endDate.format();

		get_crimes_by_date(start, end, function(crimes){
			console.log(crimes)
		});
	});

	$('#search-form').submit(function(e){
		e.preventDefault();
		console.log('does nothing')
		// get_crimes_by_date($date_range.val());
	});

	google.maps.event.addListener(map_container.circle, 'dragend', function(e){
		var circle = this;
		circle.getBounds()
		console.log('drag happened')
	});
	
});


// HELPER FUNCTIONS
function initialize_map() {
	var mapOptions = {
	  center: oakland,
	  zoom: 14
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var circleOptions = {
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		draggable: true,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		map: map,
		center: oakland,
		radius: 1000
    };
	var circle = new google.maps.Circle(circleOptions);
	return { circle: circle, map: map };
}

function update_date_range(){
    $date_range.val(start_date.format('YYYY-MM-DD') + " - " + end_date.format('YYYY-MM-DD'));
}

function get_crime_categories(){
	var dfd = $.Deferred();
	$.get(API_URL + '/api/crimeCategories', function(data){
		dfd.resolve(data);
	});
	return dfd.promise();
}

function get_crimes_by_date(start, end, cb){
	$.ajax({
		method: 'GET',
		url: API_URL + '/api',
		data: { start: start, end: end },
		success: cb
	});
}

// get_crimes_by_type($crime_type.val())


