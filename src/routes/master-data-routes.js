const express = require("express")
const masterDataRouter = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { getAllCountries, getAllUseCases } = require("../controller/master-data-controller");

masterDataRouter.get("/countries",urlencodedParser, getAllCountries);
masterDataRouter.get("/usecases", urlencodedParser, getAllUseCases);
// masterDataRouter.post('/add', addBlog);
// masterDataRouter.put("/update/:id", updateBlog);
// masterDataRouter.get("/:id", getById);
// masterDataRouter.delete("/:id", deleteBlog);
// masterDataRouter.get("/user/:id", getByUserId)
module.exports = masterDataRouter;