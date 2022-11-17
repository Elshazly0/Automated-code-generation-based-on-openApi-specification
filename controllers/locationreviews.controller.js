

      const locationreviewsService = require('../services/locationreviews.service');
      const service = new locationreviewsService();

      class locationreviewsController {

      

        

                        async getlocationreviews(req, res, next) {
                            const result = await reviewService.getReviews();
                    
                            if (reviews) {
                                res.send(reviews)
                    
                            }
                        }
                        
                        

                        async getlocationreviews(req, res, next) {
                            const result = await reviewService.getReviews();
                    
                            if (reviews) {
                                res.send(reviews)
                    
                            }
                        }
                        
                        




          async locationreviews(req, res, next) {
        let input = req.body;
        console.log(input)
        const result = await service.createlocationreviews(input)

        if (result) {
            res.send("");

        } else {

            res.send("")
            }

    }


      }

    module.exports = locationreviewsController;
    