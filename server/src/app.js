const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'jwhunt19'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'jwhunt19'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'this is an example message',
    title: 'Help',
    name: 'jwhunt19'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forescast: 'sunny',
    location: 'pizza town'
  })
})


app.listen(3000, () => {
  console.log('server is running on port 3000')
})