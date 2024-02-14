const router = require('express').Router()
const { validateUserRegister, validateUserLogin } = require('../common/validation')
const { getUser, register, login } = require('./../controller/user')

router.get('/:id', getUser)
router.post('/register', validateUserRegister, register)
router.post('/login', validateUserLogin, login)
// router.put('/user', validateUser, editUser)

module.exports = router
