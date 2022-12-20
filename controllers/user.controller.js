
        const userService = require('../services/user.service');
        const service = new userService();
        
        
        class userController {
        
              
        
                
            async postuser (req, res, next) {

        let body = req.body;

        const result = await reviewService.createReview(body)

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }

    }
    
            async postuser (req, res, next) {

        let body = req.body;

        const result = await reviewService.createReview(body)

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }

    }
    
            async getuserbyusername (req, res, next) {
                const id = req.query.username;
                const result = await userService.getuserbyusername (username);

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }
    
            async getuser (req, res, next) {
                
                const result = await userService.getuser ();

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }
    
            async getuserbyusername (req, res, next) {
                const id = req.query.username;
                const result = await userService.getuserbyusername (username);

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }
    
            async deleteuser (req, res, next) {

        const id = req.query.id;

        const result = await reviewService.deleteReview(id);

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }

    }
    
        
        
        
        }
        module.exports = userController;
        