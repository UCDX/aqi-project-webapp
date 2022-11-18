const router = require('express').Router()
const childProcess = require('child_process')
const path = require('path')

router.post('/predict-by-comps', (req, res) => {
  command = [
    'python',
    path.join(process.env.PROJECT_ROOT_DIR, 'src', 'scripts', 'aqi-predictor.py'),
    '--mode="by_comps"',
    `--co="${req.body.co}"`,
    `--no="${req.body.no}"`,
    `--no2="${req.body.no2}"`,
    `--o3="${req.body.o3}"`,
    `--so2="${req.body.so2}"`,
    `--pm2_5="${req.body.pm2_5}"`,
    `--pm10="${req.body.pm10}"`,
    `--nh3="${req.body.nh3}"`
  ]
  //console.log(command.join(' '))
  //res.send('ok')
  //return
  childProcess.exec(command.join(' '), (err, stdout, stderr) => {
    if(err) {
      console.log('----Error----')
      console.log(err)
      res.json({ success: false, error: err, stderr: stderr })
      return
    }
    console.log('---stdout---')
    console.log(stdout)
    result = JSON.parse(stdout)
    result.stderr = stderr
    delete result.time_series_fig_path
    result.success = true
    res.json( result )
  })
})

router.post('/generate-random-sample', (req, res) => {
  command = [
    'python',
    path.join(process.env.PROJECT_ROOT_DIR, 'src', 'scripts', 'aqi-predictor.py'),
    '--mode="generate_random_sample"',
    `--sample-size="${req.body.sample_size}"`,
    `--co="${req.body.co.mean} ${req.body.co.sd}"`,
    `--no="${req.body.no.mean} ${req.body.no.sd}"`,
    `--no2="${req.body.no2.mean} ${req.body.no2.sd}"`,
    `--o3="${req.body.o3.mean} ${req.body.no2.sd}"`,
    `--so2="${req.body.so2.mean} ${req.body.so2.sd}"`,
    `--pm2_5="${req.body.pm2_5.mean} ${req.body.pm2_5.sd}"`,
    `--pm10="${req.body.pm10.mean} ${req.body.pm10.sd}"`,
    `--nh3="${req.body.nh3.mean} ${req.body.nh3.sd}"`
  ]
  //console.log(command.join(' '))
  //res.send('ok')
  //return
  childProcess.exec(command.join(' '), (err, stdout, stderr) => {
    if(err) {
      console.log('----Error----')
      console.log(err)
      res.json({ success: false, error: err, stderr: stderr })
      return
    }
    console.log('---stdout---')
    console.log(stdout)
    result = JSON.parse(stdout)
    result.stderr = stderr
    delete result.time_series_fig_path
    result.success = true
    res.json( result )
  })
})

module.exports = router