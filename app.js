require('dotenv').config();
const request = require('request');

const weatherAPI = process.env.WEATHER_API || ''
const geocodingAPI = process.env.GEOCODING_API || ''

let query = '1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC';

const weatherURL = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=40.014984,-105.270546&units=f`;
const geocodeURL = `http://api.positionstack.com/v1/forward?access_key=${geocodingAPI}&query=${query}&limit=1`

// Weather

request({url: weatherURL, json: true}, (error, response) => {
  if (error) {
    console.log('unable to connect to weather services')
  } else if (response.body.error) {
    console.log('unable to find location')
  } else {
    const data = response.body.current
    console.log(`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. There is a ${data.precip}% chance of rain.`)
  }
})

// Geocoding

request({url: geocodeURL, json: true}, (error, response) => {
  if (error) {
    console.log('unable to connect to location services')
  } else if (response.body.error) {
    console.log('unable to find location')
  } else {
    const data = response.body.data[0]
    const latitude = data.latitude
    const longitude = data.longitude
    console.log(`long:${longitude}\nlat:${latitude}`)
  }
})

