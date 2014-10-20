var oakland = { lat: 37.807314, lng: -122.271371 };
var API_URL = 'http://oakland-crime.herokuapp.com';
var start_date = moment('2013-10-01');
var end_date = moment('2013-10-31');
var $crime_type = $('input[name="crime_type"]');
var $date_range = $('input[name="date_range"]');

// development
API_URL = 'http://localhost:8080';

get_crime_categories().then(function(categories){
	var num_categories = categories.length;
	var random1 = Math.floor(Math.random() * (num_categories - 0 + 1)) + 0;
	var random2 = Math.floor(Math.random() * (num_categories - 0 + 1)) + 0;
	var random3 = Math.floor(Math.random() * (num_categories - 0 + 1)) + 0;

	// populate field with 3 randoms
	$crime_type.tagsinput('add', categories[random1]);
	$crime_type.tagsinput('add', categories[random2]);
	$crime_type.tagsinput('add', categories[random3]);

	// typeahead and suggestion engine
	var category_suggestions = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: $.map(categories, function(category) { 
			console.log(category);
			return { value: category }; 
		})
	});
	category_suggestions.initialize();

	$crime_type.typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	}, {
		name: 'category_suggestions',
		displayKey: 'value',
		source: category_suggestions.ttAdapter()
	});

}, function(err){
	console.log('oh shit')
});



function initialize_map() {
	var mapOptions = {
	  center: oakland,
	  zoom: 11
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize_map);

$(function(){
	$date_range.daterangepicker({
		format: 'YYYY-MM-DD',
		startDate: start_date,
		endDate: end_date,
		showDropdowns: true
		// ranges:,
		// minDate:,
		// maxDate:,
		// dateLimit:
	}, function(start, end, label){
		console.log('A date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
	});
	update_date_range();
});

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





