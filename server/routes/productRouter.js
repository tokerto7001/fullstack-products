const router = require('express').Router();
const { allProductsControler, newProductController, oneProductController, deleteProductController, updateProductController } = require('../controllers/productController')

router
    .get('/', allProductsControler)
    .post('/', newProductController)
    .get('/product/:id', oneProductController)
    .delete('/product/:id', deleteProductController)
    .patch('/product/:id', updateProductController)

module.exports = router;

