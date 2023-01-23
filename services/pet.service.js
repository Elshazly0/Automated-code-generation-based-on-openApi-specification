const petModel = require("../models/review");

class petService {
  async postpet(Object) {
    const newpet = new petModel(Object);
    return await newpet;
  }

  async getpetbystatus(status) {
    return await pet;
  }

  async getpetbytags(tags) {
    return await pet;
  }

  async getpetbypetId(petId) {
    return await pet;
  }

  async postpet(Object) {
    const newpet = new petModel(Object);
    return await newpet;
  }

  async deletepet(id) {
    return await pet;
  }

  async postpet(Object) {
    const newpet = new petModel(Object);
    return await newpet;
  }
}

module.exports = petService;
