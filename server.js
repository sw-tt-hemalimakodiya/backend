const app = require('./app')
const { port } = require('./config')

app.initDB(null).then(function () {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
  })
})
