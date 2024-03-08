const express = require('express')
const { loginUser, signupUser } = require('../Controllers/user.controller')
const router = express.Router()


router.post('/signin', loginUser)
// signup route
router.post('/signup', signupUser)

module.exports = router