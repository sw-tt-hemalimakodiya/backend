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

// Pre-findOneAndUpdate middleware to prevent updates if orders exist and check custom parameter
categorySchema.pre('findOneAndUpdate', async function (next) {
  const Product = mongoose.model('products');
  const categoryId = this.getQuery()._id;
  const operationName = this.options.operationName;  // Access the custom parameter
  const productCount = await Product.countDocuments({ categoryId, isDeleted:0 });
  
  if (productCount > 0 && operationName === 'delete') {
    const err = new Error('Cannot Delete : There are some products are associated with this product.');
    err.name = 'HasOrdersError';
    return next(err);
  }
  next();
});
module.exports = mongoose.model('categories', categorySchema)
