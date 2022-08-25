'use strict';

//require an instance of Express like React needs to be imported
const express = require('express');

//get json data
const weatherData = require('./data/weather.json');
// console.log(weatherData);

//!require dotenv and invoke config - if installed
require('dotenv').config();

//invoke express on an instance of app
const app = express();

//define the port value
const PORT = process.env.PORT || 3002;

//create routes to access endpoints - similar to axios.get
//two params, URL and callback function
//callback function gets two params, REQUEST and RESPONSE
app.get('/', (request, response) => {
  //send a response
  response.send('hello world!');
});

//creating specific routes by attaching endpoint to URL param
//request logs in the terminal, not the browser
app.get('/weather', (request, response) => {
  let city_name = request.query.city_name.toLowerCase();
  let cityObj = weatherData.find(cityWeather => cityWeather.city_name.toLowerCase() === city_name);
  let queriedCity = cityObj.data.map(cityWeather => {
    return new Forecast(({
      date: cityWeather.datetime,
      description: cityWeather.weather.description
    }));
  });
  response.send({ queriedCity });
  console.log(queriedCity);
});

//catch-all star (*) route, error 404
app.get('*', (wreck, rez) => {
  rez.send('Wrong page. Now beat it. 404');
});


//errors

//classes
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.date;
    this.description = cityWeather.description;
  }
}

//Express has access to listen method by way of app
//pass PORT value
//pass a callback function
app.listen(PORT, () => console.log(`this is my port ${PORT}`));
