const next = require('next')
const express = require('express')
const router = require('./router')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv')
const dev = false
const server = next({ dev })
const handle = server.getRequestHandler()
const mongodb = require('./mongo');
const path  = require('path')
dotenv.config()
app.use(cors())
app.use(express.urlencoded({extended: false,limit:'25mb'}))
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json())
app.use('/', router)
server.prepare()
.then(() => {
app.get('*',(req,res) => {
    return handle(req,res)
})
mongodb.connect( err => {
    if(err)
    throw err

    app.listen(process.env.PORT,() => console.log(dev))
} )
})
.catch(er => {
    console.error(er.stack)
})



module.exports = app

