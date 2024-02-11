const { categoryList, getCategory, addCategory, editCategory, deleteCategory } = require('../controller/category')
const router = require('express').Router()
const { validateCategory } = require('../common/validation')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/category/') // Set the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Math.floor(Math.random() * 10000)}_${file.originalname}`)
  }
})
const upload = multer({ storage })

router.get('/', categoryList)
router.get('/:id', getCategory)
router.post('/', upload.single('image'), validateCategory, addCategory)
router.put('/:id', validateCategory, editCategory)
router.delete('/:id', deleteCategory)

module.exports = router
