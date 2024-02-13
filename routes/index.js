module.exports = (app) => {
  const categoryRoutes = require('./category')
  app.use('/category', categoryRoutes)

  const userRoutes = require('./user')
  app.use('/user', userRoutes)
}
