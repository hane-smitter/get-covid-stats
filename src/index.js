const path =require('path');
const express = require('express');
const unirest = require('unirest');

const app = express();

const port = process.env.PORT ?? 3000;

const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));

app.get('/pandemic', (req, res) => {
    if( !req.query.country ) {
        return res.send({
            error: "You must provide a contry name"
        })
    }
    // res.send('yup! Gotten your message!');
    console.log(req.query.country);
    unirest
        .get(`https://covid-193.p.rapidapi.com/history?country=${req.query.country}`)
        .headers({
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": process.env.APIKEY,
            "useQueryString": true
        })
        .then((data) => {
            if( data.statusCode >= 200 && data.statusCode < 300 ) {
               return res.send(data.body);
            }
            return res.status(data.statusCode).send({
               msg: "Whoops!An error occured!! Contact Admin for assistance."
            });  

        }, err => {
            console.log(err);
        })
});
  app.listen(port, () => {
      console.log("server is running on port: " + port);
  });

 /*  var unirest = require("unirest");

  var req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");
  
  req.headers({
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "0123a40dd6mshafcf1a330795890p1c96a9jsn8f46636f4f0b",
      "useQueryString": true
  });
  
  
  req.end(function (res) {
      if (res.error) throw new Error(res.error);
  
      console.log(res.body);
  }); */
  
//documentation
// Get the current status of all countries
// get("https://covid-193.p.rapidapi.com/statistics");
// Get the current status for a specific country
// get("https://covid-193.p.rapidapi.com/statistics?country=china");
// Get the current status in the world
// get("https://covid-193.p.rapidapi.com/statistics?country=all");