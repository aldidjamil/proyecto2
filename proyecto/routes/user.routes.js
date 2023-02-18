const express = require('express');
const router = express.Router();


const User = require('../models/User.model')


/* GET home page */


router.get("/list-users", (req, res, next) => {

    User

        .find()
        .then(users => { res.render('user/list', { users }) })
        .catch(err => next(err))

})

router.get("/edit/:id", (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/edit-form', user))
        .catch(err => next(err))

})

router.post('/edit/:id', (req, res, next) => {
    console.log('hola')
    const { username, email, profileImg, id } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg })
        .then(() => res.redirect('/user/list-users'))
        .catch(err => next(err))

})






module.exports = router;


