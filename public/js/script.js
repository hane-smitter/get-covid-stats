import {fetchCovidData} from './writePage.js';
import {axesLinearChart} from './drawChart.js';


async function justWaitForData(){
    await fetchCovidData();
    axesLinearChart();
}
justWaitForData();


