// Setup
const path = require('path')
const fs = require('fs')
process.env.PROJECT_ROOT_DIR = path.join(__dirname, '..')
require('dotenv').config({ path: path.join(process.env.PROJECT_ROOT_DIR, 'etc', '.env') })
if(!fs.existsSync(path.join(process.env.PROJECT_ROOT_DIR, 'tmp'))) {
  console.log('Tmp dir does not exist. Creating.')
  fs.mkdirSync(path.join(process.env.PROJECT_ROOT_DIR, 'tmp'), { recursive: true })
}

// Load dependencies
const express = require('express')

// Load modules
const viewsModule = require('./modules/views/router')
const aqiModelsModule = require('./modules/aqi_models/router')
const resourcesModule = require('./modules/resources/router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/views', viewsModule)
app.use('/api/aqi-models', aqiModelsModule)
app.use('/api/resources', resourcesModule)
app.get('/', (req, res) => {
  console.log('root page')
  res.sendFile(path.join(process.env.PROJECT_ROOT_DIR, 'src', 'templates', 'index.html'))
})

module.exports = app
