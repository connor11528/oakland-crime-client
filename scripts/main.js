var oakland = { lat: 37.807314, lng: -122.271371 };

function initialize() {
	var mapOptions = {
	  center: oakland,
	  zoom: 11
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

var start_date = moment('2013-10-01');
var end_date = moment('2013-10-31');

$(function(){
	$('input[name="date_range"]').daterangepicker({
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
    $('input[name="date_range"]').val(start_date.format('YYYY-MM-DD') + " - " + end_date.format('YYYY-MM-DD'));
}