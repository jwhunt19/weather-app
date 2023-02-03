require('dotenv').config();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
  return console.log('No input detected, please try again')
} else {
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return console.log(error)
    
    forecast(latitude, longitude, (error, { weather, temperature, precip } = {}) => {
      if (error) return console.log(error)

      console.log(location)
      console.log(`${weather}. It is currently ${temperature} degrees with a ${precip}% chance of rain.`)
    })
  })
}


