import { createRequire } from "module";
const require = createRequire(import.meta.url);

import pkg from 'fs-extra';
import SwaggerParser from '@apidevtools/swagger-parser';
import { join as pathJoin } from 'path';
const ordersSwagger = require('./openapi.json')


const { writeFile, ensureDir, pathExists } = pkg;



(async () => {
    if (!(await SwaggerParser.validate(ordersSwagger))) {
        throw Error('Invalid Swagger');
    }
    // console.log('===========')
    // console.log('Serialized:')
    // console.log('===========')
    // console.log(JSON.stringify(ordersSwagger));
    // console.log('==========')
    // console.log('Formatted:')
    // console.log('==========')


    const title = ordersSwagger.info.title.toLowerCase();

    console.log(ordersSwagger.paths["/order"])


    const APP_ROOT_DIR = pathJoin(process.cwd());
    const CONTROLLERS_DIR = pathJoin(APP_ROOT_DIR, 'controllers');

    const SERVICES_DIR = pathJoin(APP_ROOT_DIR, 'services');

    await writeFile(pathJoin(CONTROLLERS_DIR, `${title}.controller.js`), `
  const ${title}Service = require('../services/${title}');
  const Service = new ${title}Service();
  
  class ${title}Controller {
  
    
      async ${(ordersSwagger.paths["/order"].post) ? "create" : "get "
        }${title}(req, res, next) {
    let input = req.body;
    console.log(input)
    const result = await ${title}Service.create${title}(input)

    if (result) {
        res.send(result);

    } else {

        res.send("error")
    }

}
  
    
  }

module.exports = ${title}Controller;
`);

    await writeFile(pathJoin(SERVICES_DIR, `${title}.service.js`), `
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
`);


})();