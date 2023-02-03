const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb')

const mongodb = new  MongoClient(process.env.CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true})
    
module.exports = mongodb

