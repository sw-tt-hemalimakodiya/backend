const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  category_id: {
    type: String, ref: 'categories'
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    default: ''
  },
  status: { type: Number, default: 1 }, // 1: asctive, 0:Inactive
  isDeleted: { type: Number, default: 0 }
},
{ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })

module.exports = mongoose.model('products', productSchema)
