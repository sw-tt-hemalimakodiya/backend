module.exports = (app) => {
  const categoryRoutes = require('./category')
  app.use('/category', categoryRoutes)

  const productRoutes = require('./product')
  app.use('/product', productRoutes)

  const userRoutes = require('./user')
  app.use('/user', userRoutes)
}
