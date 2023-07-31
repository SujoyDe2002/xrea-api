const express = require("express")
const masterDataRouter = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { getAllCountries, getAllUseCases } = require("../controller/master-data-controller");

masterDataRouter.get("/countries",urlencodedParser, getAllCountries);
masterDataRouter.get("/usecases", urlencodedParser, getAllUseCases);
module.exports = masterDataRouter;