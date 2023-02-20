const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login-form', { errorMessage: 'Init session for continue' })
    }
}
const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('auth/login-form')
    }
}
const checkRole = (...role) => (req, res, next) => {

    if (role.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login-form', { errorMessage: 'Don´t have permissions' })
    }

}

module.exports = { isLoggedIn, isLoggedOut, checkRole }