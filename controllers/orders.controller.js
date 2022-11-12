
  const ordersService = require('../services/orders');
  const service = new ordersService();
  
  class ordersController {
  
    
      async createorders(req, res, next) {
    let input = req.body;
    console.log(input)
    const result = await service.createorders(input)

    if (result) {
        res.send("Successful response");

    } else {

        res.send("Bad Request")
        }

}
  
    
  }

module.exports = ordersController;
