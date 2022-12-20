
        const storeModel = require('../models/review')
        
        class storeService {
         
        
        
            
        async getstore() {
            return await storeModel.find({});
        }
                                
        async poststore(Object) {
            const newstore = new  storeModel(Object);
            return await newstore.save();
        }
                                
        async getstorebyorderId(orderId) {
            return await storeModel.find({});
        }
                                
        async deletestore(id) {
            return await storeModel.findByIdAndDelete(id);
        
                                }
                                 
        }
        
        module.exports = storeService;
        