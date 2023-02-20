// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require('./config/session.config')(app)


// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "SERVIDORES";

app.locals.appTitle = `${capitalize(projectName)}`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const userRoutes = require('./routes/user.routes')
app.use("/user", userRoutes)

const authRoutes = require('./routes/auth.routes')
app.use("/", authRoutes)

const movieRoutes = require('./routes/movie.routes')
app.use("/movie", movieRoutes)



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
