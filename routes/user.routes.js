const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const axios = require("axios");
const User = require('../models/User.model')
const ApiServiceTheaters = require('../services/movies.service')
const Movie = ('../models/Movie.model')
const moviesApi = new ApiServiceTheaters()


router.get("/list-users", isLoggedIn, checkRole('USER', 'ADMIN'), (req, res, next) => {

    User

        .find()
        .then(users => {
            res.render('user/list', {
                users: users,
                isAdmin: req.session.currentUser?.role === 'ADMIN',
                isUser: req.session.currentUser?.role === 'USER'
            })
        })
        .catch(err => next(err))

})

router.get("/edit/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/edit-form', user))
        .catch(err => next(err))

})

router.post('/edit/:id', isLoggedIn, (req, res, next) => {
    console.log('hola')
    const { username, email, profileImg, id } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg })
        .then(() => res.redirect('/user/list-users'))
        .catch(err => next(err))

})

router.post('/delete/:id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/user/list-users'))
        .catch(err => next(err))
})

router.get("/profile", isLoggedIn, (req, res, next) => {

    const favoriteMovies = req.session.currentUser.favoriteMovies.map(elm => {
        return moviesApi.getMovieById(elm)
    })

    Promise
        .all(favoriteMovies)
        .then((favMovies) => {
            res.render("user/profile", { user: req.session.currentUser, favMovies })
            console.log(req.session.currentUser)

        })
        .catch(err => next(err))
})

router.post('/add_favorite/:movieId', isLoggedIn, (req, res, next) => {

    const { movieId } = req.params
    const userId = req.session.currentUser?._id

    User
        .findByIdAndUpdate(userId, { $addToSet: { favoriteMovies: movieId } }, { new: true })
        .then((newUser) => {
            req.session.currentUser = newUser
            console.log(newUser)
            res.redirect('/user/profile')

        })
        .catch(err => next(err))
})



module.exports = router;


