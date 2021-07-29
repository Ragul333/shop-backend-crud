const { createProduct, getProduct, updateProduct, getProductById, deleteProduct } = require('../controllers/productController')
const auth = require('../middleware/auth')
const router = require('express').Router()

// Only admin
router.post('/create',auth,createProduct)
router.put('/:id',auth,updateProduct)
router.delete('/:id',auth,deleteProduct)
// Both admin and users
router.get('/',getProduct)
router.get('/:id',getProductById)


module.exports = router