const request = require('request');

const weatherAPI = process.env.WEATHER_API || ''

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${latitude},${longitude}&units=f`;

  request({url, json: true}, (error, response) => {
    if (error) callback('unable to connect to weather services')
    else if (response.body.error) callback('unable to find location')
    else callback(undefined, {
      weather: response.body.current.weather_descriptions[0],
      temperature: response.body.current.temperature,
      precip: response.body.current.precip
    })
    }
  )
}

module.exports = forecast