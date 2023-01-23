const express = require('express');
    const router = express.Router();
    const petstoreValidator = require('../validation/review')
    const { validate } = require('express-validation');
        
const pet = require('../controllers/pet.controller.js');
const petController=new pet() 

const store = require('../controllers/store.controller.js');
const storeController=new store() 

const user = require('../controllers/user.controller.js');
const userController=new user() 

  
router.put('/pet',   petController.putpet);  
router.post('/pet',validate(petstoreValidator.createpet),  petController.postpet);  
router.get('/pet/findByStatus',   petController.getpetbystatus);  
router.get('/pet/findByTags',   petController.getpetbytags);  
router.get('/pet/:petId',   petController.getpetbypetId);  
router.post('/pet/:petId',   petController.postpet);  
router.delete('/pet/:petId',   petController.deletepet);  
router.post('/pet/:petId/uploadImage',   petController.postpet);  
router.get('/store/inventory',   storeController.getstore);  
router.post('/store/order',   storeController.poststore);  
router.get('/store/order/:orderId',   storeController.getstorebyorderId);  
router.delete('/store/order/:orderId',   storeController.deletestore);  
router.post('/user',   userController.postuser);  
router.post('/user/createWithList',   userController.postuser);  
router.get('/user/login',   userController.getuserbyusername);  
router.get('/user/logout',   userController.getuser);  
router.get('/user/:username',   userController.getuserbyusername);  
router.put('/user/:username',   userController.putuser);  
router.delete('/user/:username',   userController.deleteuser);  

module.exports = router;
