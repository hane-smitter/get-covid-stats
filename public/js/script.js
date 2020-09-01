import {fetchCovidData} from './writePage.js';
import {axesLinearChart} from './drawChart.js';

var countryName;

async function justWaitForData(){
    countryName = await geoplugin_countryName();
    await fetchCovidData(countryName);
    axesLinearChart();
}
justWaitForData();


