import {fetchCovidData} from './writePage.js';
import {axesLinearChart} from './drawChart.js';

var justWaitForData = async ( ip ) => {
    await fetchCovidData( ip );
    axesLinearChart();
}
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.ipify.org?format=json');
xhr.responseType = 'json';
xhr.onload = () => {
    if( xhr.status == 200 ) {
        justWaitForData( xhr.response.ip );
    }
}
xhr.send();