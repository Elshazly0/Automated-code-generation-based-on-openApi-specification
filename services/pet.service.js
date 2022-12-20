
        const petModel = require('../models/review')
        
        class petService {
         
        
        
            
        async postpet(Object) {
            const newpet = new  petModel(Object);
            return await newpet.save();
        }
                                
        async getpetbystatus(status) {
            return await petModel.find({});
        }
                                
        async getpetbytags(tags) {
            return await petModel.find({});
        }
                                
        async getpetbypetId(petId) {
            return await petModel.find({});
        }
                                
        async postpet(Object) {
            const newpet = new  petModel(Object);
            return await newpet.save();
        }
                                
        async deletepet(id) {
            return await petModel.findByIdAndDelete(id);
        
                                }
                                 
        async postpet(Object) {
            const newpet = new  petModel(Object);
            return await newpet.save();
        }
                                
        }
        
        module.exports = petService;
        