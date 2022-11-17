import { createRequire } from "module";
const require = createRequire(import.meta.url);

import pkg from 'fs-extra';
import SwaggerParser from '@apidevtools/swagger-parser';
import { join as pathJoin } from 'path';
import { doesNotMatch } from "assert";
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



    const paths = Object.keys(ordersSwagger.paths);
    const firstPath = ordersSwagger.paths[Object.keys(ordersSwagger.paths)];
    // const firstPathmethod = Object.keys(firstPath)[0]

    //console.log(ordersSwagger)


    const title = ordersSwagger.info.title.toLowerCase();

    const APP_ROOT_DIR = pathJoin(process.cwd());
    const CONTROLLERS_DIR = pathJoin(APP_ROOT_DIR, 'controllers');
    const ROUTES_DIR = pathJoin(APP_ROOT_DIR, 'routes');
    const SERVICES_DIR = pathJoin(APP_ROOT_DIR, 'services');



    await writeFile(pathJoin(CONTROLLERS_DIR, `${title}.controller.js`), `

      const ${title}Service = require('../services/${title}.service');
      const service = new ${title}Service();

      class ${title}Controller {

      

        ${(function fun() {
            let result = ""
            for (let i = 0; i < paths.length; i++) {
                const path = ordersSwagger.paths[Object.keys(ordersSwagger.paths)[i]]
                //console.log(path)

                for (let j = 0; j < Object.keys(path).length; j++) {
                    console.log(path[Object.keys(path)[j]])
                    console.log(Object.keys(path)[j])



                    if (Object.keys(path)[j] == "get") {
                        result = result.concat(`

                        async ${Object.keys(path)[j]}${title}(req, res, next) {
                            const result = await reviewService.getReviews();
                    
                            if (reviews) {
                                res.send(reviews)
                    
                            }
                        }
                        
                        `)
                    }


                }

            }

            return result
        })()}




          async ${title}(req, res, next) {
        let input = req.body;
        console.log(input)
        const result = await service.create${title}(input)

        if (result) {
            res.send("");

        } else {

            res.send("")
            }

    }


      }

    module.exports = ${title}Controller;
    `



    );

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




    await writeFile(pathJoin(ROUTES_DIR, `${title}.routes.js`), `
    const express = require('express');
    const ${title}controller = require('../controllers/${title}.controller.js');
    const router = express.Router();
    const ${title}Controller = new ${title}controller();
    const reviewValidator = require('../validation/review')
    const { validate } = require('express-validation');



    ${(function createPaths() {
            let result = ""
            for (let i = 0; i < paths.length; i++) {
                const path = ordersSwagger.paths[Object.keys(ordersSwagger.paths)[i]]

                for (let j = 0; j < Object.keys(path).length; j++) {


                    result = result.concat(`router.${Object.keys(path)[j]}('${Object.keys(ordersSwagger.paths)[i]}', ${title}Controller.${Object.keys(path)[j]}${title});\n`)

                }

            }

            return result
        })()}




module.exports = router;
`);


})();