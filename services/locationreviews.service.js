
const locationreviewsModel = require('../models/review')

class locationreviewsService {




    async getlocationreviews() {
        return await locationreviewsModel.find({});
    }

    async postlocationreviews(Object) {
        const newlocationreviews = new locationreviewsModel(Object);
        return await newlocationreviews.save();
    }

    async getlocationreviews(id) {
        return await locationreviewsModel.findById(id);
    }

}

module.exports = locationreviewsService;
