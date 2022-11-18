const router = require('express').Router()
const aqi_simulation_views = require('./aqi_simulation')

router.use('/aqi', aqi_simulation_views)

module.exports = router
