const mongoose = require('mongoose')
// mongoose.set('useCreateIndex', true);

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  status: { type: Number, default: 1 },
  isDeleted: { type: Number, default: 0 }
},
{ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })

module.exports = mongoose.model('categories', categorySchema)
