const stripe = require('stripe')('sk_test_51LzF14FblM0T6kTo4M1M9IohR2i5hatzbRdQWuyiJ47cOsoBPAH3DKEiVkxTPAR8knuegdpFZJiS5VS9JDOW9KJd00PWVL2MVM');

export default async (req,res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.price,
        currency: 'usd',
        automatic_payment_methods: {enabled: true}
      })
      res.status(200).json({client_secret:paymentIntent})
}