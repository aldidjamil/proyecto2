const express = require('express');
const router = express.Router();
const axios = require("axios");
const { isLoggedIn, checkRole } = require('../middleware/route-guard')


const Comment = require('../models/Comment.model');
const User = require('../models/User.model');



router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Comment
        .findById(id)
        .then(comment => res.render('comment/details', comment))
        .catch(err => next(err))

})


router.post("/createcomment", isLoggedIn, (req, res, next) => {

    // console.log('entro aqui??')
    const { comment, movieId } = req.body
    const { _id } = req.session.currentUser


    Comment
        .create({ comment, movieId, owner: _id })
        .then(() => res.redirect(`/movie/details/${movieId}`))
        .catch(err => next(err))



})
router.post('/delete/:id/:movieId', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id, movieId } = req.params

    Comment
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movie/details/${movieId}`))
        .catch(err => next(err))
})



module.exports = router;
