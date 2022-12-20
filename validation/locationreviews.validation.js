
const joi = require('joi');



const locationreviewsValidation = {





    createreview: {
        location: joi.string().required(),
        review: joi.string().required(),
        body: joi.object({
        }
        },



}
module.exports = reviewValidation;
