const express = require('express');
const router = express.Router();
const axios = require("axios");
const { isLoggedIn } = require('../middleware/route-guard')
const ApiServiceTheaters = require('../services/movies.service')

const moviesApi = new ApiServiceTheaters()
const Comment = require('../models/Comment.model')


router.get("/", (req, res, next) => {
    res.render("index");
});


router.get("/250-movies", (req, res, next) => {



    moviesApi
        .getAllMovies()
        .then(movies => {

            res.render("movies/movieRender", { movies })
        })

        .catch(err => next(err))
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


    moviesApi
        .getMostPopular()
        .then(movies => {

            res.render("movies/movieRender", { movies })
        })

})

router.get("/comingSoon", (req, res, next) => {

    moviesApi
        .getComingSoon()
        .then(movies => {

            res.render("movies/movieRender", { movies })
        })
})


router.get('/details/:id', (req, res) => {
    const { id } = req.params
    const promises = [moviesApi.getMovieById(id), Comment.find({ movieId: id })]

    Promise
        .all(promises)
        .then(([movie, comments]) => {
            res.render('movies/details', { user: req.session.currentUser, movie, comments })
        })
        .catch(err => next(err))
})



module.exports = router;
