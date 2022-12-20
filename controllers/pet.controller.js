
const petService = require('../services/pet.service');
const service = new petService();


class petController {




    async postpet(req, res, next) {

        let body = req.body;

        const result = await reviewService.createReview(body)

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }

    }

    async getpetbystatus(req, res, next) {
        const id = req.query.status;
        const result = await petService.getpetbystatus(status);

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }

    async getpetbytags(req, res, next) {
        const id = req.query.tags;
        const result = await petService.getpetbytags(tags);

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }

    async getpetbypetId(req, res, next) {
        const id = req.query.petId;
        const result = await petService.getpetbypetId(petId);

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }

    async postpet(req, res, next) {

        let body = req.body;

        const result = await reviewService.createReview(body)

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }

    }

    async deletepet(req, res, next) {

        const id = req.query.id;

        const result = await reviewService.deleteReview(id);

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }

    }

    async postpet(req, res, next) {

        let body = req.body;

        const result = await reviewService.createReview(body)

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }

    }




}
module.exports = petController;
