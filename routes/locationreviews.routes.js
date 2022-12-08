
const express = require('express');
const locationreviewscontroller = require('../controllers/locationreviews.controller.js');
const router = express.Router();
const locationreviewsController = new locationreviewscontroller();
const reviewValidator = require('../validation/review')
const { validate } = require('express-validation');



    router.get('/reviews', locationreviewsController.getlocationreviews);
router.post('/reviews', locationreviewsController.postlocationreviews);
router.get('/reviews/id', locationreviewsController.getlocationreviews);





module.exports = router;
