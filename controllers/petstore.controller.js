
        const petstoreService = require('../services/petstore.service');
        const service = new petstoreService();
        
        
        class petstoreController {
        
              
        
                
            async postpetstore(req, res, next) {
        
                let body = req.body;
                
                const result = await reviewService.createReview(body)
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async getpetstore(req, res, next) {
                const id = req.query.id;
                const result = await petstoreService.getpetstore(id);
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async getpetstore(req, res, next) {
                const id = req.query.id;
                const result = await petstoreService.getpetstore(id);
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async getpetstore(req, res, next) {
                const id = req.query.id;
                const result = await petstoreService.getpetstore(id);
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async postpetstore(req, res, next) {
        
                let body = req.body;
                
                const result = await reviewService.createReview(body)
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async deletepetstore(req, res, next) {
        
                const id = req.query.id;
                
                const result = await reviewService.deleteReview(id);
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async postpetstore(req, res, next) {
        
                let body = req.body;
                
                const result = await reviewService.createReview(body)
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async getpetstore(req, res, next) {
                
                const result = await petstoreService.getpetstore();
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async postpetstore(req, res, next) {
        
                let body = req.body;
                
                const result = await reviewService.createReview(body)
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async getpetstore(req, res, next) {
                const id = req.query.id;
                const result = await petstoreService.getpetstore(id);
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async deletepetstore(req, res, next) {
        
                const id = req.query.id;
                
                const result = await reviewService.deleteReview(id);
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async postpetstore(req, res, next) {
        
                let body = req.body;
                
                const result = await reviewService.createReview(body)
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async postpetstore(req, res, next) {
        
                let body = req.body;
                
                const result = await reviewService.createReview(body)
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
            async getpetstore(req, res, next) {
                const id = req.query.id;
                const result = await petstoreService.getpetstore(id);
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async getpetstore(req, res, next) {
                const id = req.query.id;
                const result = await petstoreService.getpetstore(id);
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async getpetstore(req, res, next) {
                const id = req.query.id;
                const result = await petstoreService.getpetstore(id);
                                
                if (result) {
                    res.send(result)
                                
                }else {
        
                    res.send("error")
                }
            }
                                    
            async deletepetstore(req, res, next) {
        
                const id = req.query.id;
                
                const result = await reviewService.deleteReview(id);
        
                if (result) {
                    res.send(result);
        
                } else {
        
                    res.send("error")
                }
            
            }
                                    
        
        
        
        }
        module.exports = petstoreController;
        