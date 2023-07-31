const { mailConfiguration } = require("../model/user-deatils")
const { transporter } = require("../config/mailConfig");
const { response } = require("../response/responseMsg")
const httpStatusCodes = require("../constants/httpStatusCodesCons")



const sendmail = async (req, res) => {
    try {

        message = await mailConfiguration(req, res);

        await transporter.sendMail(message1);

        return res.status(200).json("Mail sent successfully");

    } catch (err) {
        console.log(err);
    }


}

module.exports = { sendmail }