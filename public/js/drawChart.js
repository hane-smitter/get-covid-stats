//select canvas to draw chart
const ctx = document.getElementById('axes-line-chart').getContext('2d');
let myNewChart;

function axesLinearChart() {
	if( typeof myNewChart == 'object' ) {
		myNewChart.destroy();
	}
	myNewChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Cases',
				data: window.listOfCases,
				fill: false,
				borderColor: '#fff',
				backgroundColor: '#fff',
				pointHoverBackgroundColor: '#fff000',
				borderWidth: 1
				},
				{
				label: 'recoveries',
				data: window.listOfRecoveries,
				fill: false,
				borderColor: '#006988',
				backgroundColor: '#006988',
				pointHoverBackgroundColor: '#fff000',
				borderWidth: 1
				},
				{
				label: 'Deaths',
				data: window.listOfDeaths,
				fill: false,
				borderColor: '#f44366',
				backgroundColor: '#f44366',
				pointHoverBackgroundColor: '#fff000',
				borderWidth: 1
				}
			],
			labels: window.listOfDates
		},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});
}

export {
    axesLinearChart
}