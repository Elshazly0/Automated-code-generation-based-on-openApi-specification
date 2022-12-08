
const locationreviewsModel = require('../models/review')

class locationreviewsService {
 


    
async getlocationreviews(req, res, next) {
    return await locationreviewsModel.find({});
}
                        
async postlocationreviews(req, res, next) {
    const newlocationreviews = new reviewModel(review);
    return await newlocationreviews.save();
}
                        
async getlocationreviews(req, res, next) {
    return await locationreviewsModel.findById(id);
}
                        
}

module.exports = locationreviewsService;
