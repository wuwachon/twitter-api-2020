const express = require('express')
const router = express.Router()

const APItestController = require('../controllers/APItest-controller')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')

const admin = require('./modules/admin')
const users = require('./modules/users')
const tweets = require('./modules/tweets')
const followships = require('./modules/followships')
const passport = require('../config/passport')

const { authenticated, authenticateUser, authenticateAdmin } = require('../middlewares/api-auth')
const { apiErrorHandler } = require('../middlewares/error-handler')

router.get('/api/test', APItestController.getTestJSON)
router.post('/api/admin/signin', passport.authenticate('local', { session: false }), authenticateAdmin, adminController.signIn)
router.post('/api/users/signin', passport.authenticate('local', { session: false }), authenticateUser, userController.signIn)
router.post('/api/users', userController.signUp)

router.use('/api/admin', authenticated, authenticateAdmin, admin)
router.use('/api/users', authenticated, authenticateUser, users)
router.use('/api/tweets', authenticated, authenticateUser, tweets)
router.use('/api/followships', authenticated, authenticateUser, followships)

router.use('/api', apiErrorHandler)

module.exports = router