const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const saltRounds = 10
const { isLoggedOut } = require('../middleware/route-guard')
const uploaderMiddleware = require('../middleware/uploader.middleware')

const User = require('../models/User.model')

/* GET home page */
router.get("/create-form", isLoggedOut, (req, res, next) => {
    res.render('auth/create-form')

})

router.post("/create-form", uploaderMiddleware.single('avatar'), (req, res, next) => {

    const { password } = req.body

    let profileImg = req.file ? req.file.path : undefined

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword, avatar: profileImg }))
        .then(createdUser => {
            res.redirect('/')
        })
        .catch(err => next(err))

})

router.get("/login-form", isLoggedOut, (req, res, next) => {
    res.render('auth/login-form')
})

router.post("/login-form", (req, res, next) => {

    const { email, password } = req.body
    if (email.length === 0 || password.length === 0) {
        res.render('auth/login-form', { errorMessage: 'Por favor, rellena los campos' })
        return
    }
    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login-form', { errorMessage: 'Usuario no registrado' })
            }
            else if (!bcrypt.compareSync(password, user.password)) {
                res.render('auth/login-form', { errorMessage: 'Datos incorrectos (es la pwd...)' })
            }
            else {
                req.session.currentUser = user
                console.log('ESTO ES EL OBJETO req.session --->', req.session)
                res.redirect('/')
            }
        })
        .catch(err => next(err))
})

router.get('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router;


