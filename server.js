const express = require("express");
const masterDataRouter = require("./src/routes/master-data-routes");
const searchDataRouter = require("./src/routes/search-data-routes");
const userDataRouter = require("./src/routes/user-routes");
require("./src/config/pg-client");

const cors = require('cors');
const app = express();

app.use(cors());
app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    //console.log('err :', err)
    //res.status(500);
    res.status(500).send('500: something went wrong');
});
app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/masters", masterDataRouter);
app.use("/api/search", searchDataRouter);
app.use("/api/users",userDataRouter);

/* app.use("/api", (req, res, next) => {
    res.send("hello")
}) */

//define port
app.listen(3011, () => console.log("app started at 3011..."));