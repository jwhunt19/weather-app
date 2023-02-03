const request = require('request');

const geocodingAPI = process.env.GEOCODING_API || ''

const geocode = (query, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=${geocodingAPI}&query=${encodeURIComponent(query)}&limit=1`

  request({url, json: true}, (error, { body } = {}) => {
    if (error) callback('Unable to connect to location services')
    else if (body.error) callback('Unable to find location. Try another search')
    else callback(undefined, {
      latitude: body.data[0].latitude,
      longitude: body.data[0].longitude,
      location: body.data[0].label
    })
  })
}

module.exports = geocode