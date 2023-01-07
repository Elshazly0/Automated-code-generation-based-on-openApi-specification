import { createRequire } from "module";
const require = createRequire(import.meta.url);
import pkg from 'fs-extra';
import SwaggerParser from '@apidevtools/swagger-parser';
import { join as pathJoin } from 'path';
import { doesNotMatch } from "assert";
import format from 'prettier-format'
import { Console } from "console";
const ordersSwagger = require('./swaggerFiles/FullDocumantation.json')


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
    //  console.log(ordersSwagger)
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
    const VALIDATION_DIR = pathJoin(APP_ROOT_DIR, 'validation');



    let pathname;
    for (let i = 0; i < ordersSwagger.tags.length; i++) {
        pathname = ordersSwagger.tags[i].name
        let thisControllerPaths = [];
        // console.log(ordersSwagger.paths)
        for (let j = 0; j < paths.length; j++) {
            // console.log(Object.keys(ordersSwagger.paths)[j].slice(1, pathname.length + 1))

            if (Object.keys(ordersSwagger.paths)[j].slice(1, pathname.length + 1) == `${pathname}`) {
                thisControllerPaths.push(Object.keys(ordersSwagger.paths)[j])
            }

        }
        //console.log(thisControllerPaths)


        await writeFile(pathJoin(CONTROLLERS_DIR, `${pathname}.controller.js`), format.sync(`
        const ${pathname}Service = require('../services/${pathname}.service');
        const service = new ${pathname}Service();
        
        
        class ${pathname}Controller {
        
              
        
                ${(function CreateController() {
                let result = ""

                // console.log(paths)
                for (let i = 0; i < thisControllerPaths.length; i++) {
                    const first = ordersSwagger.paths[thisControllerPaths[i]]

                    for (let j = 0; j < Object.keys(first).length; j++) {


                        if (Object.keys(first)[j] == "get") {

                            let parameters = ""
                            let id = ""
                            let found = false
                            if (first[Object.keys(first)[j]].hasOwnProperty("parameters")) {
                                found = true
                                // console.log(first[Object.keys(first)[j]])
                                id = id.concat(`${first[Object.keys(first)[j]].parameters[0].name}`);

                                parameters = parameters.concat(`const id = req.query.${id};`);
                            }

                            result = result.concat(`
            async ${Object.keys(first)[j]}${pathname}${found ? `by${id}` : ""} (req, res, next) {
                ${parameters}
                const result = await ${pathname}Service.get${pathname}${found ? `by${id}` : ""} (${id});

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }
    `)
                        }


                        if (Object.keys(first)[j] == "post") {


                            result = result.concat(`
            async ${Object.keys(first)[j]}${pathname} (req, res, next) {

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
                        if (Object.keys(first)[j] == "delete") {


                            result = result.concat(`
            async ${Object.keys(first)[j]}${pathname} (req, res, next) {

        const id = req.query.id;

        const result = await reviewService.deleteReview(id);

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
        module.exports = ${pathname}Controller;
        `   ));




        await writeFile(pathJoin(SERVICES_DIR, `${pathname}.service.js`), format.sync(`
        const ${pathname}Model = require('../models/review')
        
        class ${pathname}Service {
         
        
        
            ${(function CreateService() {

                let result = ""

                // console.log(paths)
                for (let i = 0; i < thisControllerPaths.length; i++) {
                    const first = ordersSwagger.paths[thisControllerPaths[i]]

                    for (let j = 0; j < Object.keys(first).length; j++) {
                        //  console.log(Object.keys(first)[j])
                        let parameters = ""
                        if (Object.keys(first)[j] == "get") {


                            let id = ""
                            let found = false
                            if (first[Object.keys(first)[j]].hasOwnProperty("parameters")) {
                                found = true
                                id = id.concat(`${first[Object.keys(first)[j]].parameters[0].name}`);

                                parameters = parameters.concat(``);
                            }

                            result = result.concat(`
        async ${Object.keys(first)[j]}${pathname}${found ? `by${id}` : ""}(${found ? `${id}` : ""}) {
            ${parameters ? parameters : `return await ${pathname}Model.find({});`}
        }
                                `)
                        }
                        if (Object.keys(first)[j] == "post") {


                            result = result.concat(`
        async ${Object.keys(first)[j]}${pathname}(Object) {
            const new${pathname} = new  ${pathname}Model(Object);
            return await new${pathname}.save();
        }
                                `)
                        }
                        if (Object.keys(first)[j] == "delete") {
                            result = result.concat(`
        async ${Object.keys(first)[j]}${pathname}(id) {
            return await ${pathname}Model.findByIdAndDelete(id);
        
                                }
                                 `)

                        }








                    }
                }

                return result
            })()}
        }
        
        module.exports = ${pathname}Service;
        `));


    }


    await writeFile(pathJoin(ROUTES_DIR, `${title}.routes.js`),
        `const express = require('express');
    const router = express.Router();
    const reviewValidator = require('../validation/review')
    const { validate } = require('express-validation');
        ${(function createPaths() {
            let result = ""

            for (let i = 0; i < ordersSwagger.tags.length; i++) {

                result = result.concat(`
const ${ordersSwagger.tags[i].name} = require('../controllers/${ordersSwagger.tags[i].name}.controller.js');
const ${ordersSwagger.tags[i].name}Controller=new ${ordersSwagger.tags[i].name}() \n`)
            }
            result = result.concat(`\n  \n`)
            const first = ordersSwagger.paths
            let pathname
            for (let i = 0; i < Object.keys(ordersSwagger.tags).length; i++) {
                pathname = ordersSwagger.tags[i].name
                let thisControllerPaths = [];
                // console.log(ordersSwagger.paths)
                for (let j = 0; j < paths.length; j++) {
                    // console.log(Object.keys(ordersSwagger.paths)[j].slice(1, pathname.length + 1))

                    if (Object.keys(ordersSwagger.paths)[j].slice(1, pathname.length + 1) == `${pathname}`) {
                        const hello = ordersSwagger.paths[Object.keys(ordersSwagger.paths)[j]]
                        for (let z = 0; z < Object.keys(hello).length; z++) {


                            let parameters = ""
                            let id = ""
                            let found = false

                            if (Object.keys(hello)[z] == 'get') {

                                const operation = hello[Object.keys(hello)[z]];

                                if (operation.hasOwnProperty("parameters")) {

                                    found = true
                                    id = id.concat(`${operation.parameters[0].name}`);

                                    parameters = parameters.concat(`by${id}`);
                                }
                            }
                            result = result.concat(`router.${Object.keys(hello)[z]}('${Object.keys(ordersSwagger.paths)[j]}',${pathname}Controller.${Object.keys(hello)[z]}${pathname}${parameters});  \n`)

                        }


                    }

                }

            }

            return result
        })()
        }
module.exports = router;
`);

    await writeFile(pathJoin(VALIDATION_DIR, `${title}.validation.js`), format.sync(`
const joi = require('joi');

const ${title}Validation = {
    ${(function CreateValidation() {

            let result = ""
            for (let i = 0; i < paths.length; i++) {
                const path = ordersSwagger.paths[Object.keys(ordersSwagger.paths)[i]]


                for (let j = 0; j < Object.keys(path).length; j++) {
                    const first = path[Object.keys(path)[j]]
                    //console.log(first)




                    // console.log((Object.keys(path)[j]))
                    let parameters

                    if (Object.keys(path)[j] == "post") {
                        const one = path[Object.keys(path)[j]];

                        if (one.hasOwnProperty('requestBody') == true) {

                            if (one.requestBody.content.hasOwnProperty('application/json')) {

                                if (one.requestBody.content['application/json'].schema.hasOwnProperty('required')) {
                                    result = result.concat(`
    create${one.requestBody.content['application/json'].schema.xml.name}: {
                                        `)
                                    const parameters = one.requestBody.content['application/json'].schema.required

                                    for (let z = 0; z < parameters.length; z++) {
                                        //console.log(one.requestBody.content['application/json'].schema.xml.name)
                                        const required = one.requestBody.content['application/json'].schema.properties
                                        //console.log(required[parameters[0]])
                                        result = result.concat(`
        ${parameters[z]}: joi.${required[parameters[z]].type}().required(),`)



                                    }

                                    result = result.concat(`
                                
    }
        
                                        `)

                                }

                            }
                        } else if (one.hasOwnProperty('parameters')) {
                            for (let z = 0; z < one.parameters; z++) {

                            }
                        }


                    }
                }
            }
            return result


        })()
        }
}
module.exports = ${title}Validation;
`    ));





})();
