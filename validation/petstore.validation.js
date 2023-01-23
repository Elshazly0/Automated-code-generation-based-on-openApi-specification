const joi = require("joi");

const petstoreValidation = {
  createpet: {
    name: joi.string().required(),
    photoUrls: joi.array().required(),
  },
};
module.exports = petstoreValidation;
