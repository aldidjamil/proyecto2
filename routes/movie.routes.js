const express = require('express');
const router = express.Router();
const axios = require("axios");

const ApiServiceTheaters = require('../services/movies.service')

const moviesApi = new ApiServiceTheaters()



router.get("/", (req, res, next) => {
    res.render("index");
});

























// router.get("/list-theaters", (req, res, next) => {


//     // res.send('Hola'))
//     moviesApi
//         .getAllMovies()
//         // .then(response => res.render("movies/list-theaters", { movie: response.data }))
//         .then(response => console.log(response))

//         // .then(response => console.log(response))
//         .catch(err => console.log(err))
// })

module.exports = router;
