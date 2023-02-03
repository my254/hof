const nodemailer = require('nodemailer')

const Mailer = function(data){
    this.data = data
}
Mailer.prototype.mail = async function(){
  return new Promise( async (resolve,reject) => {
      const transporter = nodemailer.createTransport({
        port: 587,               // true for 465, false for other ports
        host: "asili.tandahost.co.ke",
           auth: {
                user: 'info@thepartnergroup.co.ke',
                pass: 'inf0123456',
             },
        secure: false,
        });
    
        const mailData = {
              from: this.data.from,  // sender address
              to: 'info@thepartnergroup.co.ke',   // list of receivers
              subject: `You have a new message from ${this.data.from}`,
              text: 'That was easy!',
              html: `
              <b>Client name: ${this.data.from} </b><br>
              <b>Client phone: ${this.data.phone} </b><br>
              <b>Client email: ${this.data.email} </b><br>
              <b>Client inquiry: ${this.data.url} </b><br><br>
              <b>Message: ${this.data.message} </b>
              `,
            };
            transporter.sendMail(mailData, function (err, info) {
                if(err)
                 { reject("Email was not sent please try again later!")
                  console.log(err)}
                else
                  {resolve("Email has been sent thank you for contacting us.")
                  console.log(info);}
             })
    })
}
module.exports = Mailer