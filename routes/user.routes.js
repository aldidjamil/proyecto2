const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const axios = require("axios");
const User = require('../models/User.model')
const ApiServiceTheaters = require('../services/movies.service')
const Movie = ('../models/Movie.model')
const moviesApi = new ApiServiceTheaters()


router.get("/list-users", isLoggedIn, checkRole('USER', 'ADMIN'), (req, res, next) => {
    const { id } = req.params
    const promises = [moviesApi.getMovieById(id), User.find({ movieId: id })]
    console.log(req.params)

    Promise
        .all(promises)
        .then(([movie, user]) => {

            console.log(user)
            res.render('user/list', {
                user: user,
                movie: movie,
                isAdmin: req.session.currentUser?.role === 'ADMIN',
                isUser: req.session.currentUser?.role === 'USER'
            })
        })
        .catch(err => next(err))

    // User

    //     .find()
    //     .then(users => {
    //         console.log(users)
    //         res.render('user/list', {
    //             users: users,
    //             isAdmin: req.session.currentUser?.role === 'ADMIN',
    //             isUser: req.session.currentUser?.role === 'USER'
    //         })
    //     })
    //     .catch(err => next(err))

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

router.get("/profile/:id", isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User


    const promises = [favoriteMovies, watchList]

    Promise
        .all(promises.map(elm => Promise.all(elm)))
        .then(([favMovies, watchList]) => {
            console.log(favMovies)
            console.log(watchList)
            res.render("user/profile", { user: req.session.currentUser, favMovies, watchList })

        })
        .catch(err => next(err))




})


router.post('/addMovie/:action/:movieId', isLoggedIn, (req, res, next) => {

    const { action, movieId } = req.params
    const userId = req.session.currentUser?._id

    const query = action === 'addFav' ? { favoriteMovies: movieId } : { watchList: movieId }

    User
        .findByIdAndUpdate(userId, { $addToSet: query }, { new: true })
        .then((newUser) => {
            req.session.currentUser = newUser
            // console.log(newUser)
            res.redirect('/user/profile')
        })
        .catch(err => next(err))
})

router.post('/deleteMovie/:action/:movieId', isLoggedIn, (req, res, next) => {
    const { action, movieId } = req.params
    const userId = req.session.currentUser?._id
    console.log(req.params)



    const query = action === 'delFav' ? { favoriteMovies: movieId } : { watchList: movieId }

    User
        .findByIdAndUpdate(userId, { $pull: query }, { new: true })
        .then((newUser) => {
            req.session.currentUser = newUser
            res.redirect('/user/profile')
        })
        .catch(err => next(err))


})

// router.get('/details/:action/:movieId', (req, res, next) => {
//     const { action, movieId } = req.params
//     const userId = req.session.currentUser?._id

//     const query = action === 'detFav' ? { favoriteMovies: movieId } : { watchList: movieId }

//     User
//         .findById


// })
// router.post('/delete/favMovie:id', isLoggedIn, (req, res, next) => {
//     const { id } = req.params
//     const userId = req.session.currentUser?._id

//     User
//         .findByIdAndDelete(userId, { $addToSet: { favoriteMovies: id } })
//         .then(() => res.redirect('/user/profile'))
//         .catch(err => next(err))
// })

module.exports = router;


