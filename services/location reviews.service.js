
const reviewModel = require('../Models/review')

class ReviewService {


    async getReviews() {
        return await reviewModel.find({});
    }

    async getReview(id) {
        return await reviewModel.findById(id);
    }


    async createReview(review) {

        const Review = new reviewModel(review);
        return await Review.save();

    }
    async deleteReview(id) {
        return await reviewModel.findByIdAndDelete(id);
    }

}



module.exports = ReviewService;
