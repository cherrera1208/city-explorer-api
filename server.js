'use strict';

//require an instance of Express like React needs to be imported
const express = require('express');
// const weatherData = require('./weather.json');
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
  console.log(request);
  response.send('weather page');
});

//catch-all star (*) route for errors, e.g. 404
app.get('*', (wreck, rez) => {
  rez.send('404. now beat it');
});

//Express has access to listen method by way of app
//pass PORT value
//pass a callback function
app.listen(PORT, () => console.log(`this is my port ${PORT}`));
