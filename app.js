const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const app = express();

// Enable all CORS requests
app.use(cors());

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
