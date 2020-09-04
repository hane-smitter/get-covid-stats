const path =require('path');
const express = require('express');
const unirest = require('unirest');
const { Crawler } = require('es6-crawler-detect');

const { listOfCountries } = require('./countries/countries.js');

const app = express();

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));

app.get('/pandemic', async (req, res) => {
    //fetching visitors info using ipgeolocation.io api
    try {
        const geoData = await unirest.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_APIKEY}&ip=${req.query.ip}`)
        if( !geoData.status >= 200 && !geoData.status < 300 ) {
            return res.status(geoData.status).send({
                err: "geo Error"
            });
        }

        const countryCode = geoData.body.country_code2;
        const countryObj =  listOfCountries.find( (country) => country.code == countryCode);
        var countryName = countryObj.name.replace(/\s/g, '-');
        const covidData = await unirest
                                    .get(`https://covid-193.p.rapidapi.com/history?country=${countryName}`)
                                    .headers({
                                        "x-rapidapi-host": "covid-193.p.rapidapi.com",
                                        "x-rapidapi-key": process.env.COVID_APIKEY,
                                        "useQueryString": true
                                    });

        if( !covidData.statusCode >= 200 && !covidData.statusCode < 300 ) {
            return res.status(covidData.statusCode).send({
                err: "covid error"
            });
        }
        covidData.body.ip = geoData.body.ip;

        res.send( covidData.body );
    } catch (err) {
        console.log(err);
    }

});

app.get('/pandemic2', async (req, res) => {


    if( !req.query.country ) {
        return res.status(400).send({
            error: "You must provide a contry name"
        })
    }
    const countryName = req.query.country.replace(/\s/g, '-');

    try {
        const covidData = await unirest
                                    .get(`https://covid-193.p.rapidapi.com/history?country=${countryName}`)
                                    .headers({
                                        "x-rapidapi-host": "covid-193.p.rapidapi.com",
                                        "x-rapidapi-key": process.env.COVID_APIKEY,
                                        "useQueryString": true
                                    });

        if( !covidData.statusCode >= 200 && !covidData.statusCode < 300 ) {
            return res.status(covidData.statusCode).send({
                err: "2-covid error"
            });
        }

        res.send( covidData.body );
    } catch( err ) {
        console.log(err);
    }
});

  app.listen(port, () => {
      console.log("server is running on port: " + port);
  });