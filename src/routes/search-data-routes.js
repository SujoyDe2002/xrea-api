const express = require("express")
const searchDataRouter = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { getAllSearchList, eachSearchDelete, searchItem, getIndiviualSearchItem, saveSearch} = require("../controller/search-data-controller");


searchDataRouter.get("/searchList",urlencodedParser, getAllSearchList);
searchDataRouter.post("/searchDelete", urlencodedParser, eachSearchDelete);
searchDataRouter.post("/searchForSegment", urlencodedParser, searchItem);
searchDataRouter.post("/getSearchItem", urlencodedParser, getIndiviualSearchItem);
searchDataRouter.post("/save", urlencodedParser, saveSearch);


module.exports = searchDataRouter;