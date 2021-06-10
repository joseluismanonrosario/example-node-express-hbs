const config = require('./config');
const nodemailer = require('nodemailer');

const transport=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:'jmanon.cafam@gmail.com',
        pass:config.mail.pass
    }
})

transport.verify().then(()=>{
    console.log('Ready to send emails');
})

module.exports = {
    transport
}