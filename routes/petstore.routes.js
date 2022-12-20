
const express = require('express');
const petstorecontroller = require('../controllers/petstore.controller.js');
const router = express.Router();
const petstoreController = new petstorecontroller();
const reviewValidator = require('../validation/review')
const { validate } = require('express-validation');



router.put('/pet', petstoreController.putpetstore);
router.post('/pet', petstoreController.postpetstore);
router.get('/pet/findByStatus', petstoreController.getpetstore);
router.get('/pet/findByTags', petstoreController.getpetstore);
router.get('/pet/{petId}', petstoreController.getpetstore);
router.post('/pet/{petId}', petstoreController.postpetstore);
router.delete('/pet/{petId}', petstoreController.deletepetstore);
router.post('/pet/{petId}/uploadImage', petstoreController.postpetstore);
router.get('/store/inventory', petstoreController.getpetstore);
router.post('/store/order', petstoreController.postpetstore);
router.get('/store/order/{orderId}', petstoreController.getpetstore);
router.delete('/store/order/{orderId}', petstoreController.deletepetstore);
router.post('/user', petstoreController.postpetstore);
router.post('/user/createWithList', petstoreController.postpetstore);
router.get('/user/login', petstoreController.getpetstore);
router.get('/user/logout', petstoreController.getpetstore);
router.get('/user/{username}', petstoreController.getpetstore);
router.put('/user/{username}', petstoreController.putpetstore);
router.delete('/user/{username}', petstoreController.deletepetstore);





module.exports = router;
