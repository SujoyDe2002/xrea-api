const express = require("express")
const searchDataRouter = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { getAllSearchList, eachSearchDelete, searchItem, getIndiviualSearchItem, saveSearch} = require("../controller/search-data-controller");

// searchDataRouter.get("/countries", getAllCountries);
// searchDataRouter.get("/usecases", getAllUseCases);
// // masterDataRouter.post('/add', addBlog);
// // masterDataRouter.put("/update/:id", updateBlog);
// // masterDataRouter.get("/:id", getById);
// // masterDataRouter.delete("/:id", deleteBlog);
// // masterDataRouter.get("/user/:id", getByUserId)

searchDataRouter.get("/searchList",urlencodedParser, getAllSearchList);
searchDataRouter.post("/searchDelete", urlencodedParser, eachSearchDelete);
searchDataRouter.post("/searchForSegment", urlencodedParser, searchItem);
searchDataRouter.post("/getSearchItem", urlencodedParser, getIndiviualSearchItem);
searchDataRouter.post("/save", urlencodedParser, saveSearch);


module.exports = searchDataRouter;