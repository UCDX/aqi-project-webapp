const router = require('express').Router()
const fs = require('fs')
const path = require('path')

router.get('/image/:name', (req, res) => {
  imagePath = path.join(process.env.PROJECT_ROOT_DIR, 'tmp', req.params.name)
  if(!fs.existsSync(imagePath)) {
    return res.status(404).send()
  }
  res.sendFile(imagePath, (err) => {
    if(err) {
      console.log(err)
    }
    try {
      fs.unlinkSync(imagePath)
    } catch(err) {
      console.log('Failed while unlinking file:')
      console.log(err)
    }
  })
  
})

module.exports = router
