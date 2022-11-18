// Setup
const path = require('path')
process.env.PROJECT_ROOT_DIR = path.join(__dirname, '..')
require('dotenv').config({ path: path.join(process.env.PROJECT_ROOT_DIR, 'etc', '.env') })

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

module.exports = app
