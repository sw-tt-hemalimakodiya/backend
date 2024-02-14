const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  phoneNo: { type: String, trim: true },
  authToken: { type: String, trim: true },
  status: { type: Number, default: 1 },
  isDeleted: { type: Number, default: 0 }
},
{ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })

// Hashing the password before storing it
userSchema.methods.setPassword = function (pin) {
  // Hash the password with the salt
  this.password = bcrypt.hashSync(pin, bcrypt.genSaltSync(10))
}

// userSchema.path('phoneNo').validate(function (value, respond) {
//   return mongoose.model('users').countDocuments({ phoneNo: value, isDeleted: 0 }).exec().then(function (count) {
//     return !count
//   })
//     .catch(function (err) {
//       throw err
//     })
// }, 'Phone Already associated with another account')

// userSchema.path('email').validate(function (value, respond) {
//   return mongoose.model('users').countDocuments({ email: value.toLowerCase(), isDeleted: 0 }).exec().then(function (count) {
//     return !count
//   })
//     .catch(function (err) {
//       throw err
//     })
// }, 'Email Already associated with another account')

// Checking the password for login
userSchema.methods.validPassword = function (pin) {
  return bcrypt.compareSync(pin, this.password) // true
}

module.exports = mongoose.model('users', userSchema)
