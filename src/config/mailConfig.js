const nodeMailer = require('nodemailer');


let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kirtibiswas2198@gmail.com',
        pass: 'ytuwdjhkznyhckkd'
    }
}) 

module.exports = { transporter }