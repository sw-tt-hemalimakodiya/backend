const express = require('express')
const { initPool } = require('./core/db')
const { verifyToken } = require('./common/utils')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Initialze database
app.initDB = async (poolPromise) => { app.pool = await initPool(poolPromise) }

// Verify token on each request.
app.use(verifyToken)

// Link router
require('./routes')(app)

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (typeof err === 'string') {
    const errMsg = {
      ERR_URL_NOT_FOUND: {
        status: 404,
        message: 'Url Not Found'
      }
    }
    const seletedMsg = errMsg[err] || { status: 500, message: err }
    res.status(seletedMsg.status).json({
      userMessage: seletedMsg.message
    })
  } else {
    console.log('err === ', err)
    if (err.response && err.response.status) {
      res.status(err.response.status).json(err.response.data)
    } else {
      res.status(err.status || 500).json({ message: err.message || err.toString() })
    }
  }
})

module.exports = app
