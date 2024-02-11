const mongoose = require('mongoose')
const { mongodbUrl, databaseName } = require('../config')

const initPool = async (pool) => {
  try {
    if (pool) {
      return pool
    } else {
      // establish connection
      pool = await mongoose.connect(`${mongodbUrl}/${databaseName}`)
      console.log('Database connected...')
      return pool
    }
  } catch (error) {
    return { code: 500, message: 'database connection error', error }
  }
}

module.exports = { initPool }
