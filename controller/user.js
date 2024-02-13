const mongoose = require('mongoose')
const UserSchema = require('../schema/user')
const { SUCCESS } = require('../core/constant').responseStatus

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
    const user = new UserSchema({ username, email, password })
    await user.setPassword(password)
    const data = await user.save()
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const data = await UserSchema.find({ isDeleted: 0 }).sort({ createdAt: -1 }) || []
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUser,
  register,
  login
}
