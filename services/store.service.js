const storeModel = require("../models/review");

class storeService {
  async getstore() {
    return await store;
  }

  async poststore(Object) {
    const newstore = new storeModel(Object);
    return await newstore;
  }

  async getstorebyorderId(orderId) {
    return await store;
  }

  async deletestore(id) {
    return await store;
  }
}

module.exports = storeService;
