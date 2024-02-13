const router = require('express').Router()
const { validateUser } = require('../common/validation')
const { getUser, register, login } = require('./../controller/user')

router.get('/:id', getUser)
router.post('/register', validateUser, register)
router.post('/login', validateUser, login)
// router.put('/user', validateUser, editUser)

module.exports = router
