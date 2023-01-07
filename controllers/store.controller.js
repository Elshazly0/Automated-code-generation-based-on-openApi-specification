const storeService = require("../services/store.service");
const service = new storeService();

class storeController {
  async getstore(req, res, next) {
    const result = await storeService.getstore();

    if (result) {
      res.send(result);
    } else {
      res.send("error");
    }
  }

  async poststore(req, res, next) {
    let body = req.body;

    const result = await reviewService.createReview(body);

    if (result) {
      res.send(result);
    } else {
      res.send("error");
    }
  }

  async getstorebyorderId(req, res, next) {
    const id = req.query.orderId;
    const result = await storeService.getstorebyorderId(orderId);

    if (result) {
      res.send(result);
    } else {
      res.send("error");
    }
  }

  async deletestore(req, res, next) {
    const id = req.query.id;

    const result = await reviewService.deleteReview(id);

    if (result) {
      res.send(result);
    } else {
      res.send("error");
    }
  }
}
module.exports = storeController;
