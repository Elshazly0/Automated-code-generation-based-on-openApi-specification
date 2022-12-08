
const locationreviewsService = require('../services/locationreviews.service');
const service = new locationreviewsService();


class locationreviewsController {

      

        
    async getlocationreviews(req, res, next) {
        
        const result = await locationreviewsService.getlocationreviews();
                        
        if (result) {
            res.send(result)
                        
        }else {

            res.send("error")
        }
    }
                            
    async postlocationreviews(req, res, next) {

        let body = req.body;
        
        const result = await reviewService.createReview(body)

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }
    
    }
                            
    async getlocationreviews(req, res, next) {
        const id = req.query.id;
        const result = await locationreviewsService.getlocationreviews(id);
                        
        if (result) {
            res.send(result)
                        
        }else {

            res.send("error")
        }
    }
                            



}
module.exports = locationreviewsController;
