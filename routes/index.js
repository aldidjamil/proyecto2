module.exports = app => {
    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const userRoutes = require('./user.routes')
    app.use("/user", userRoutes)

    const authRoutes = require('./auth.routes')(app)
    app.use("/", authRoutes)

    const movieRoutes = require('./movie.routes')
    app.use("/movie", movieRoutes)

    const commentsRoutes = require('./comment.routes')
    app.use("/comment", commentsRoutes)
}