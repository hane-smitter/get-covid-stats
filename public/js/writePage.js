import { getCovidStats } from './getStats.js';

let $statsDataSection = document.getElementsByClassName('latest-report')[0];

let $nameOfCountry = $statsDataSection.querySelector('.country .name');
let $datePosted = $statsDataSection.querySelector('.country .date');
let $cases = $statsDataSection.querySelector('.total-cases');
let $recoveries = $statsDataSection.querySelector('.recovered');
let $deaths = $statsDataSection.querySelector('.deaths');

async function fetchCovidData( countryName ) {
    await getCovidStats(countryName.replace(/\s/g, '-'))
        .then((res) => {
            updatePage(countryName, res);
        })
        .catch((err) => {
            console.log(err);
        });
    
}
function updatePage( country, data ) {
    $nameOfCountry.textContent = country;
    $datePosted.textContent = sanitizeDate(data.response[0].time);

    $cases.querySelector('.new-value').textContent = '+' + formatNumber(data.response[0].cases.new);
    $cases.querySelector('.value .current').textContent = formatNumber(data.response[0].cases.active);
    $cases.querySelector('.value .cumulative').textContent = formatNumber(data.response[0].cases.total);

    $recoveries.querySelector('.new-value').textContent = calcNewRecoveries((data.response[0].cases.recovered),(data.response[1].cases.recovered));
    $recoveries.querySelector('.value .cumulative').textContent = formatNumber(data.response[0].cases.recovered);

    $deaths.querySelector('.new-value').textContent = '+' + formatNumber(data.response[0].deaths.new);
    $deaths.querySelector('.value .cumulative').textContent = formatNumber(data.response[0].deaths.total);

    //make list of first ten results available everywhere
    let cases_list = new Array();
    let recoveries_list = new Array();
    let deaths_list = new Array();
    let dates_list = new Array();
    for( let i = 0; i <= 10; i++) {
        cases_list.push(data.response[i].cases.total);
        recoveries_list.push(data.response[i].cases.recovered);
        deaths_list.push(data.response[i].deaths.total);
        dates_list.push(new Date(data.response[i].time).toLocaleString('en-GB'));
    }
    window.listOfCases = cases_list;
    window.listOfRecoveries = recoveries_list;
    window.listOfDeaths = deaths_list;
    window.listOfDates = dates_list;

}
function calcNewRecoveries( day1, day2 ) {
    return "+" + (formatNumber(day1 - day2));
}
function sanitizeDate(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString(undefined, options);
}
function formatNumber( num ) {
    return new Intl.NumberFormat().format(num);
}

export {
    fetchCovidData
}