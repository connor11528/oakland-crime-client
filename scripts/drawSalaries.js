// might be better to do statistical analysis first: 
// https://github.com/tmcw/simple-statistics

var API_URL = 'http://oakland-crime.herokuapp.com';
API_URL = 'http://localhost:8080';

var target = document.getElementById('salaries_target');

function drawSalaries(target){
	var h = 500;
	var w = 800;

	var svg = d3.select(target).append('svg')
		.attr('width', w)
		.attr('height', h);

	d3.csv(API_URL + '/api/officerSalaries', function(data){
		// salaries.length == 19,920
		// {FULL_NAME: "Martinez, Edna M.", EARNINGS_2000: "73,888.66", TITLE: "Account Clerk III", REP: "UH1", YEAR: "2000"}
		var salaries = _.map(data, function(s){
			var salary = s.EARNINGS_2000;
			if(_.isString(salary)){
				salary = salary.split(',').join('');
			}
			salary = parseFloat(salary);
			return salary;
		});

		var yScale = d3.scale.linear()
			.domain([0, d3.max(salaries) * 1.1])
			.range([0, h]);

		var xScale = d3.scale.linear()
			.domain([0, salaries.length])
			.range([0, w])

		svg.selectAll('rect').data(salaries)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', function(d, i){
				return xScale(i);
			})
			.attr('y', function(d){
				return h - yScale(d);
			})
	})

}

drawSalaries(target);