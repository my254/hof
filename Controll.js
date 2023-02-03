const Mailer = require('./Mailer')
const fs = require('fs')
const path = require('path')
const Db = require('./db')
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51LzF14FblM0T6kTo4M1M9IohR2i5hatzbRdQWuyiJ47cOsoBPAH3DKEiVkxTPAR8knuegdpFZJiS5VS9JDOW9KJd00PWVL2MVM');

exports.pay = async function(req,res){
    const paymentIntent = await stripe.paymentIntents.create({
        amount:req.body.price,
        currency: 'usd',
        automatic_payment_methods: {enabled: true},
      })
      res.status(200).json({client_secret:paymentIntent})
}

exports.send = function(req,res){
    console.log(req.body)
    let M = new Mailer(req.body)
     M.mail().then(
     (response) => res.status(200).json({response: response})
     ).catch(
    (error) => res.status(401).json({response: error})
     )

}
exports.PropImgHandler = (req,res) => {
    res.status(200).json({data: req.image})
}

exports.deleteProp  =function(req,res){
    req.body.url.map( async url => {
        //let st = req.body.url.split('/',2)
        const dir = `./public${url}`
        fs.unlink(dir,() => console.log("done"))
    } )
    res.status(200).json({response: "DELETED"})
}
