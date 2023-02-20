const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRole } = require('../middleware/route-guard')

const User = require('../models/User.model')



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

router.get("/edit/:id", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/edit-form', user))
        .catch(err => next(err))

})

router.post('/edit/:id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
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

    res.render("user/profile", { user: req.session.currentUser })
})


module.exports = router;


