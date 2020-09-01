import {fetchCovidData} from './writePage.js';
import {axesLinearChart} from './drawChart.js';

var countryCode = geoplugin_countryCode();
var countryName = geoplugin_countryName();

async function justWaitForData(){
    await fetchCovidData(countryName);
    axesLinearChart();
}
justWaitForData();


