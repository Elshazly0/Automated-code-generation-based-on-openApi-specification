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



    const paths = await Object.keys(ordersSwagger.paths);
    const firstPath = await ordersSwagger.paths[Object.keys(ordersSwagger.paths)];
    // const firstPathmethod = Object.keys(firstPath)[0]
    const path = ordersSwagger.paths[Object.keys(ordersSwagger.paths)[0]];
    const first = path[Object.keys(path)[0]]
    //console.log(Object.keys(first))

    //console.log(ordersSwagger.paths["/reviews"].get.responses[200].content)


    const title = ordersSwagger.info.title.toLowerCase();

    const APP_ROOT_DIR = pathJoin(process.cwd());
    const CONTROLLERS_DIR = pathJoin(APP_ROOT_DIR, 'controllers');
    const ROUTES_DIR = pathJoin(APP_ROOT_DIR, 'routes');
    const SERVICES_DIR = pathJoin(APP_ROOT_DIR, 'services');




    await writeFile(pathJoin(CONTROLLERS_DIR, `${title}.controller.js`), `
const ${title}Service = require('../services/${title}.service');
const service = new ${title}Service();


class ${title}Controller {

      

        ${(function CreateController() {
            let result = ""
            for (let i = 0; i < paths.length; i++) {
                const path = ordersSwagger.paths[Object.keys(ordersSwagger.paths)[i]]


                for (let j = 0; j < Object.keys(path).length; j++) {
                    const first = path[Object.keys(path)[j]]
                    console.log(first)

                    // console.log(path[Object.keys(path)[j]])
                    console.log((Object.keys(path)[j]))

                    if (Object.keys(path)[j] == "get") {

                        let parameters = ""
                        let id = ""
                        for (let z = 0; z < Object.keys(first).length; z++) {

                            if (Object.keys(first)[z] == "parameters") {

                                id = id.concat(`id`);
                                parameters = parameters.concat(`const id = req.query.id;`);
                            }
                        }
                        result = result.concat(`
    async ${Object.keys(path)[j]}${title}(req, res, next) {
        ${parameters}
        const result = await ${title}Service.get${title}(${id});
                        
        if (result) {
            res.send(result)
                        
        }else {

            res.send("error")
        }
    }
                            `)
                    }


                    if (Object.keys(path)[j] == "post") {


                        result = result.concat(`
    async ${Object.keys(path)[j]}${title}(req, res, next) {

        let body = req.body;
        
        const result = await reviewService.createReview(body)

        if (result) {
            res.send(result);

        } else {

            res.send("error")
        }
    
    }
                            `)
                    }
                }
            }
            return result

        })()}



}
module.exports = ${title}Controller;
`    );



    await writeFile(pathJoin(SERVICES_DIR, `${title}.service.js`), `
const ${title}Model = require('../models/review')

class ${title}Service {
 


    ${(function CreateService() {
            let result = ""
            for (let i = 0; i < paths.length; i++) {
                const path = ordersSwagger.paths[Object.keys(ordersSwagger.paths)[i]]


                for (let j = 0; j < Object.keys(path).length; j++) {
                    const first = path[Object.keys(path)[j]]
                    console.log(first)

                    // console.log(path[Object.keys(path)[j]])
                    console.log((Object.keys(path)[j]))
                    let parameters
                    if (Object.keys(path)[j] == "get") {

                        for (let z = 0; z < Object.keys(first).length; z++) {

                            if (Object.keys(first)[z] == "parameters") {
                                parameters = `return await ${title}Model.findById(id);`
                            }
                        }
                        result = result.concat(`
async ${Object.keys(path)[j]}${title}(req, res, next) {
    ${parameters ? parameters : `return await ${title}Model.find({});`}
}
                        `)
                    }
                    if (Object.keys(path)[j] == "post") {


                        result = result.concat(`
async ${Object.keys(path)[j]}${title}(req, res, next) {
    const new${title} = new reviewModel(review);
    return await new${title}.save();
}
                        `)
                    }
                }
            }
            return result

        })()}
}

module.exports = ${title}Service;
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
        })()
        }




module.exports = router;
`);


})();