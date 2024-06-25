const ProductSchema = require('../schema/product')
const { SUCCESS } = require('../core/constant').responseStatus

const productList = async (req, res, next) => {
  try {
    const data = await ProductSchema.find({ isDeleted: 0 }).sort({ createdAt: -1 }) || []
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await ProductSchema.findOne({ isDeleted: 0, _id: id }) || []
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const { body } = req
    const number = await ProductSchema.countDocuments()
    body._id = `P${Math.floor(Math.random() * 100)}${(number + 1).toString().padStart(4, '0')}`
    const productData = new ProductSchema(body)
    const data = await productData.save()
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await ProductSchema.findOneAndUpdate({ _id: id, isDeleted: 0 }, { $set: body })
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await ProductSchema.findOneAndUpdate({ _id: id, isDeleted: 0 }, { $set: { isDeleted: 1 } })
    res.status(SUCCESS).json({ status: SUCCESS, data })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  productList,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct
}
