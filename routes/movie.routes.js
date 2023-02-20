const express = require('express');
const router = express.Router();
const axios = require("axios");

const ApiServiceTheaters = require('../services/movies.service')

const moviesApi = new ApiServiceTheaters()



router.get("/", (req, res, next) => {
    res.render("index");
});

router.get("/250-movies", (req, res, next) => {


    // res.send('Hola'))
    moviesApi
        .getAllMovies()
        .then(movies => {
            // res.json(movies)
            res.render("movies/movieRender", { movies })
        })
        // .then(response => console.log(response.data))
        // .then(response => console.log(response))
        .catch(err => console.log(err))
})

router.get("/inTheaters", (req, res, next) => {

    moviesApi
        .getInTheaters()
        .then(movies => {
            res.render("movies/movieRender", { movies })
        })
        .catch(err => next(err))
})

router.get("/mostPopular", (req, res, next) => {
    // res.send('entro?')

    moviesApi
        .getMostPopular()
        .then(movies => {
            // res.json(movies)
            res.render("movies/movieRender", { movies })
        })

})

router.get("/comingSoon", (req, res, next) => {

    moviesApi
        .getComingSoon()
        .then(movies => {
            // res.json(movies)
            res.render("movies/movieRender", { movies })
        })
})

module.exports = router;
