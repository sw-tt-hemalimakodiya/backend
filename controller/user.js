const mongoose = require('mongoose')
const UserSchema = require('../schema/user')
const { SUCCESS } = require('../core/constant').responseStatus
const { generateAuthToken, prepareMail, sendMail } = require('./../common/utils')
const { userRegister } = require('./../common/emailTemplates')

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await UserSchema.find({ isDeleted: 0, _id: new mongoose.Types.ObjectId(id) }) || []
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const isEmail = await UserSchema.findOne({ email, isDeleted: 0 })
    if (isEmail) {
      next({ status: 402, message: 'Email already exists' })
    }
    const user = new UserSchema({ username, email, password })
    await user.setPassword(password)
    const data = await user.save()
    if (data) {
      const { subject, template } = await prepareMail(userRegister, { Name: username, Your_Company_Name: 'Tchnoapps development' })
      await sendMail([email], subject, template)
    }
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const data = await UserSchema.findOne({ email, isDeleted: 0 })
    if (!data) {
      next({ status: 402, message: 'Invalid email' })
    } else if (!data.validPassword(password)) {
      next({ status: 402, message: 'Invalid Password' })
    } else {
      const authToken = await generateAuthToken(email)
      res.status(SUCCESS).json({ status: SUCCESS, data: { ...data.toJSON(), authToken } })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUser,
  register,
  login
}
