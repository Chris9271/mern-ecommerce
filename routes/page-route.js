const express = require('express');
const router = express.Router();
const pageController = require('../controller/page-controller');

router.get('/men', pageController.getMensProduct);
router.get('/women', pageController.getWomensProduct);
router.get('/sale', pageController.getSaleProduct);
router.get('/new', pageController.getNewProduct);
router.get('/accessory', pageController.getAccessoryProduct);
router.post('/cart', pageController.postNewCart);
router.get('/cart', pageController.getCart);
router.put('/cart', pageController.putUpdateItemAmount);
router.patch('/cart', pageController.patchAdjustCart);
router.delete('/cart', pageController.deleteCart);
router.get('/product/:id', pageController.getSingleProduct);

module.exports = router;