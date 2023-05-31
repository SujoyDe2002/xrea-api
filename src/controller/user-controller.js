const { mailConfiguration } = require("../model/user-deatils")
// const nodeMailer = require('nodemailer');
const { transporter } = require("../config/mailConfig");



const sendmail = async (req, res) => {


    message = await mailConfiguration(req, res);

    const info = await transporter.sendMail(message);

   // console.log(info);

    if (!info) {
        return res.status(404).json({ message: "Mail not sent" });
    }

    return res.status(200).json({ message: "Mail sent successfully" });

}

module.exports = { sendmail }