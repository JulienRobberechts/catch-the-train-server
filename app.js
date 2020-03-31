var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const {
  handleAllError,
  handleValidationError,
  handleConnectivityError
} = require("./utils/errors");

var schedulesRoutes = require("./routes/schedules");
var healthChecksRoutes = require("./routes/healthCheck");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/schedules", schedulesRoutes);
app.use("/", healthChecksRoutes);

app.use(handleValidationError);
app.use(handleConnectivityError);
app.use(handleAllError);

module.exports = app;
