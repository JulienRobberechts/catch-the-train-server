var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { handleAllError, handleValidationError } = require("./utils/errors");

var schedulesRouter = require("./routes/schedules");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/schedules", schedulesRouter);

app.use(handleValidationError);
app.use(handleAllError);

module.exports = app;
