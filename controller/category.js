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
    const data = await CategorySchema.findOne({ isDeleted: 0, _id: id }) || []
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const addCategory = async (req, res, next) => {
  try {
    const { body } = req
    const number = await CategorySchema.countDocuments()
    body._id = `C${Math.floor(Math.random() * 100)}${(number + 1).toString().padStart(4, '0')}`
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
    const data = await CategorySchema.findOneAndUpdate({ _id: id, isDeleted: 0 }, { $set: body })
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await CategorySchema.findOneAndUpdate({ _id: id, isDeleted: 0 }, { $set: { isDeleted: 1 } }, { operationName: 'delete' })
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    if (error.name === 'HasOrdersError') {
      console.log("inside if ===== ", error)
      console.log(error.message); // Handle the warning
    }
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
