const express = require("express");

const morgan = require("morgan");
const app = express();

//regular middleware
app.use(express.json());

//morgan middleware -logger
app.use(morgan("tiny"));

//import all routes here
const tasks = require("./routes/tasks.route");
//router middleware
app.use("/api/v1", tasks);

//export app
module.exports = app;
