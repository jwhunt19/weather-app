const request = require('request');

const weatherAPI = process.env.WEATHER_API || ''

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${latitude},${longitude}&units=f`;

  request({url, json: true}, (error, { body } = {}) => {
    if (error) callback('unable to connect to weather services')
    else if (body.error) callback('unable to find location')
    else callback(undefined, {
      weather: body.current.weather_descriptions[0],
      temperature: body.current.temperature,
      precip: body.current.precip
    })
    }
  )
}

module.exports = forecast