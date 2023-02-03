const express = require('express')
const router = express.Router()
const controll = require('./Controll')
const U = require('./MulterStore')


//user related routes
router.post('/send', controll.send)
router.post('/api/base64',U.upload_prop.array('file',4),controll.PropImgHandler)
router.post('/api/file',U.upload_prop.array('file',4),controll.PropImgHandler)
router.post('/api/delete',controll.deleteProp)
router.post('/api/pay',controll.pay)
module.exports = router