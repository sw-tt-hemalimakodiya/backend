const { validationResult, body } = require('express-validator')

const displayError = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ status: 422, errors: errors.array() })
  }
  next()
}

const validateUserLogin = [
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Please enter valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
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

const validateCategory = [
  body('name').notEmpty().withMessage('Category name is required'),
  displayError
]

const validateProduct = [
  body('categoryId').notEmpty().withMessage('Category Id is required'),
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').notEmpty().withMessage('Product price is required'),
  displayError
]

module.exports = {
  validateUserLogin,
  validateUserRegister,
  validateCategory,
  validateProduct
}
