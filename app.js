require("dotenv").config();

require("./db");

const express = require("express");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

app.locals.appTitle = `SERVIDORES`;

// app.locals.currentUser = require('./routes/user.routes')(app)



require('./routes')(app)
require("./error-handling")(app);

module.exports = app;
