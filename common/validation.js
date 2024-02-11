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

module.exports = {
  validateCategory
}
