const mongoose = require('mongoose')
const CategorySchema = require('../schema/category')
const { SUCCESS } = require('../core/constant').responseStatus

const categoryList = async (req, res, next) => {
  try {
    const data = await CategorySchema.find({ isDeleted: 0 }).sort({ createdAt: -1 }) || []
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await CategorySchema.find({ isDeleted: 0, _id: new mongoose.Types.ObjectId(id) }) || []
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const addCategory = async (req, res, next) => {
  try {
    const { body } = req
    const categoryData = new CategorySchema(body)
    const data = await categoryData.save()
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await CategorySchema.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id), isDeleted: 0 }, { $set: body })
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await CategorySchema.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id), isDeleted: 0 }, { $set: { isDeleted: 1 } })
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  categoryList,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory
}
