'use strict';
const axios = require('axios').default;

//require an instance of Express like React needs to be imported
const express = require('express');

//require dotenv and invoke config - if installed
require('dotenv').config();

//invoke express on an instance of app
const app = express();

//define the port value and alt
const PORT = process.env.PORT || 3002;

//APIs
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

//create routes to access endpoints - similar to axios.get
//two params, URL and callback function
//callback function gets two params, REQUEST and RESPONSE
app.get('/', (request, response) => {
  //send a response
  response.send('hello world!');
});

//creating specific routes by attaching endpoint to URL param
//console.logs are in the terminal, not the browser
app.get('/weather', (request, response, next) => {
  axios.get('https://api.weatherbit.io/v2.0/forecast/daily', {
    params: {
      key: WEATHER_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon,
      days: '5',
      units: 'I'
    }
  }).then(function (weatherData) {
    let fiveDayForecast = weatherData.data.data.map(forecast => {
      return new Forecast(forecast);
    });
    response.send(fiveDayForecast);
  }).catch(function (error) {
    next(error);
  }).then(function () {
    console.log('Data not found');
  });
});

app.get('/movies', (request, response, next) => {
  axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
      api_key: MOVIE_API_KEY,
      query: request.query.city
    }
  }).then(function (movieData) {
    let movieArr = movieData.data.results.map(movie => new Movie(movie));
    response.send(movieArr);
  }).catch(function (error) {
    next(error);
  }).then(function () {
    console.log('Data not found');
  });
});



// //     let city_name = request.query.city_name.toLowerCase();
// //   let cityObj = weatherData.find(cityWeather => cityWeather.city_name.toLowerCase() === city_name);
// //   let queriedCity = cityObj.data.map(cityWeather => {
// //     return new Forecast(({
// //       date: cityWeather.datetime,
// //       description: cityWeather.weather.description
// //     }));
// //   });
// //   response.send({ queriedCity });
// //   console.log(queriedCity);
// // });

//catch-all star (*) route, error 404
app.get('*', (wreck, rez) => {
  rez.send('Wrong page. Now beat it. 404');
});


//errors

//classes
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
    this.temp = cityWeather.temp;
  }
}

class Movie {
  constructor(movieData) {
    this.title = movieData.original_title;
    this.overview = movieData.overview;
    this.imgPath = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;
    this.id = movieData.id;
  }
}

//Express has access to listen method by way of app
//pass PORT value
//pass a callback function
app.listen(PORT, () => console.log(`this is my port ${PORT}`));
