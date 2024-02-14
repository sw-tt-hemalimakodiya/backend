const { validationResult, body } = require('express-validator')

const displayError = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ status: 422, errors: errors.array() })
  }
  next()
}

const validateCategory = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  displayError
]

const validateUserRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Please enter valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  displayError
]

const validateUserLogin = [
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Please enter valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  displayError
]

module.exports = {
  validateCategory,
  validateUserRegister,
  validateUserLogin
}
