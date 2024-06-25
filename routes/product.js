const router = require('express').Router()
const { validateProduct } = require('../common/validation')
const multer = require('multer')
const { productList, getProduct, addProduct, editProduct, deleteProduct } = require('../controller/product')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/product/') // Set the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Math.floor(Math.random() * 10000)}_${file.originalname}`)
  }
})
const upload = multer({ storage })

router.get('/', productList)
router.get('/:id', getProduct)
router.post('/', upload.single('image'), validateProduct, addProduct)
router.put('/:id', validateProduct, editProduct)
router.delete('/:id', deleteProduct)

module.exports = router
