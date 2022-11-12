
const ordersService = require('../services/orders');
const Service = new ordersService();

class ordersController {


  async createorders(req, res, next) {
    let input = req.body;
    console.log(input)
    const result = await ordersService.createorders(input)

    if (result) {
      res.send(result);

    } else {

      res.send("error")
    }

  }


}

module.exports = ordersController;
