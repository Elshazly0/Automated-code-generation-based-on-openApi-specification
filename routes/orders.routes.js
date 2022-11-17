
    const express = require('express');
    const orderscontroller = require('../controllers/orders.controller.js');
    const router = express.Router();
    const ordersController = new orderscontroller();
    const reviewValidator = require('../validation/review')
    const { validate } = require('express-validation');



    router.post('/order', ordersController.postorders);





module.exports = router;
