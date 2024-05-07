const mongoose = require('mongoose')
// mongoose.set('useCreateIndex', true);

const categorySchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
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

module.exports = mongoose.model('categories', categorySchema)
