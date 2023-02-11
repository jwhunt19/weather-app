const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('dotenv').config();

const geocode = require('../../utils/geocode')
const forecast = require('../../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

// Index page
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'jwhunt19'
  })
})

// About page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'jwhunt19'
  })
})

// Help pages
app.get('/help', (req, res) => {
  res.render('help', {
    message: 'this is an example message',
    title: 'Help',
    name: 'jwhunt19'
  })
})

// Weather API 
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({error})
    
    forecast(latitude, longitude, (error, { weather, temperature, precip } = {}) => {
      if (error) return res.send({error})

      res.send({
        forecast: `${weather}. It is currently ${temperature} degrees with a ${precip}% chance of rain.`,
        location,
        address: req.query.address
      })
    })
  })
})

// Error handling for help articles
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found'
  })
})

// Catch all 404 handling
app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found'
  })
})


app.listen(port, () => {
  console.log('server is running on port 3000')
})