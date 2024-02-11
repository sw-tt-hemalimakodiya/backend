module.exports = (app) => {
  const categoryRoutes = require('./category')
  app.use('/category', categoryRoutes)
}
