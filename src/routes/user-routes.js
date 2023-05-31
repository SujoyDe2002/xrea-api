const express = require("express")
const userDataRouter = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { sendmail }  = require("../controller/user-controller");


userDataRouter.post("/sendmail", urlencodedParser, sendmail);

module.exports = userDataRouter;