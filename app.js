const express = require('express')
const { initPool } = require('./core/db')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialze database
app.initDB = async (poolPromise) => { app.pool = await initPool(poolPromise) }

// Link router
require('./routes')(app)

module.exports = app
