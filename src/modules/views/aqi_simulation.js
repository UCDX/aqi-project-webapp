const Router = require('express').Router()
const path = require('path')

Router.get('/aqi-simulator', function(req, res) {
  console.log('aqi-simulator')
  res.sendFile(path.join(process.env.PROJECT_ROOT_DIR, 'src', 'templates', 'aqi_simulation.html'))
})

Router.get('/aqi-dashboard', function(req, res) {
  console.log('aqi-dashboard')
  res.sendFile(path.join(process.env.PROJECT_ROOT_DIR, 'src', 'templates', 'aqi-dashboard.html'))
})

module.exports = Router
