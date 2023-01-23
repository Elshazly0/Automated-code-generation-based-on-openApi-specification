import { createRequire } from "module";
import pkg from 'fs-extra';
const require = createRequire(import.meta.url);
import SwaggerParser from '@apidevtools/swagger-parser';
import { join as pathJoin } from 'path';
import format from 'prettier-format'
const OpenApiDocumentation = require('./Documentation/FullDocumantation.json')


const { writeFile, ensureDir, pathExists } = pkg;



(async () => {
    if (!(await SwaggerParser.validate(OpenApiDocumentation))) {
        throw Error('Invalid Swagger');
    }

    //console.log(OpenApiDocumentation)


    const DocumentationPaths = await Object.keys(OpenApiDocumentation.paths);
    const title = OpenApiDocumentation.info.title.toLowerCase();

    const APP_ROOT_DIR = pathJoin(process.cwd());
    const CONTROLLERS_DIR = pathJoin(APP_ROOT_DIR, 'controllers');
    const ROUTES_DIR = pathJoin(APP_ROOT_DIR, 'routes');
    const SERVICES_DIR = pathJoin(APP_ROOT_DIR, 'services');
    const VALIDATION_DIR = pathJoin(APP_ROOT_DIR, 'validation');



    let pathname;
    for (let i = 0; i < OpenApiDocumentation.tags.length; i++) {
        pathname = OpenApiDocumentation.tags[i].name
        let AllPaths = [];
        // console.log(OpenApiDocumentation.paths)
        for (let j = 0; j < DocumentationPaths.length; j++) {
            // console.log(Object.keys(OpenApiDocumentation.paths)[j].slice(1, tag.length + 1))

            if (Object.keys(OpenApiDocumentation.paths)[j].slice(1, pathname.length + 1) == `${pathname}`) {
                AllPaths.push(Object.keys(OpenApiDocumentation.paths)[j])
            }

        }



        await writeFile(pathJoin(CONTROLLERS_DIR, `${pathname}.controller.js`), format.sync(`
        const ${pathname}Service = require('../services/${pathname}.service');
        const service = new ${pathname}Service();
        
        
        class ${pathname}Controller {
        
              
        
                ${(function CreateController() {
                let controllerSourceCode = ""

                // console.log(paths)
                for (let i = 0; i < AllPaths.length; i++) {
                    const PathObject = OpenApiDocumentation.paths[AllPaths[i]]

                    for (let j = 0; j < Object.keys(PathObject).length; j++) {


                        if (Object.keys(PathObject)[j] == "get") {

                            let parameters = ""
                            let id = ""
                            let parametersFound = false
                            if (PathObject[Object.keys(PathObject)[j]].hasOwnProperty("parameters")) {
                                parametersFound = true
                                // console.log(PathObject[Object.keys(PathObject)[j]])
                                id = id.concat(`${PathObject[Object.keys(PathObject)[j]].parameters[0].name}`);

                                parameters = parameters.concat(`const id = req.query.${id};`);
                            }

                            controllerSourceCode = controllerSourceCode.concat(`
            async ${Object.keys(PathObject)[j]}${pathname}${parametersFound ? `by${id}` : ""} (req, res, next) {
                ${parameters}
                const result = await ${pathname}Service.get${pathname}${parametersFound ? `by${id}` : ""} (${id});

        if (result) {
            res.send(result)

        } else {

            res.send("error")
        }
    }
    `)
                        }


                        if (Object.keys(PathObject)[j] == "post") {


                            controllerSourceCode = controllerSourceCode.concat(`
            async ${Object.keys(PathObject)[j]}${pathname} (req, res, next) {

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
                        if (Object.keys(PathObject)[j] == "delete") {


                            controllerSourceCode = controllerSourceCode.concat(`
            async ${Object.keys(PathObject)[j]}${pathname} (req, res, next) {

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

                return controllerSourceCode


            })()}
        
        
        
        }
        module.exports = ${pathname}Controller;
        `   ));




        await writeFile(pathJoin(SERVICES_DIR, `${pathname}.service.js`), format.sync(`
        const ${pathname}Model = require('../models/review')
        
        class ${pathname}Service {
         
        
        
            ${(function CreateService() {

                let serviceSourceCode = ""

                // console.log(paths)
                for (let i = 0; i < AllPaths.length; i++) {
                    const PathObject = OpenApiDocumentation.paths[AllPaths[i]]

                    for (let j = 0; j < Object.keys(PathObject).length; j++) {
                        //console.log(Object.keys(PathObject)[j])
                        let parameters = ""
                        if (Object.keys(PathObject)[j] == "get") {


                            let id = ""
                            let parametersFound = false
                            if (PathObject[Object.keys(PathObject)[j]].hasOwnProperty("parameters")) {
                                parametersFound = true
                                id = id.concat(`${PathObject[Object.keys(PathObject)[j]].parameters[0].name}`);

                                parameters = parameters.concat(``);
                            }

                            serviceSourceCode = serviceSourceCode.concat(`
        async ${Object.keys(PathObject)[j]}${pathname}${parametersFound ? `by${id}` : ""}(${parametersFound ? `${id}` : ""}) {
            ${parameters ? parameters : `return await ${pathname}`}
        }
                                `)
                        }
                        if (Object.keys(PathObject)[j] == "post") {


                            serviceSourceCode = serviceSourceCode.concat(`
        async ${Object.keys(PathObject)[j]}${pathname}(Object) {
            const new${pathname} = new  ${pathname}Model(Object);
            return await new${pathname};
        }
                                `)
                        }
                        if (Object.keys(PathObject)[j] == "delete") {
                            serviceSourceCode = serviceSourceCode.concat(`
        async ${Object.keys(PathObject)[j]}${pathname}(id) {
            return await ${pathname};
        
                                }
                                 `)

                        }








                    }
                }

                return serviceSourceCode
            })()}
        }
        
        module.exports = ${pathname}Service;
        `));


    }


    await writeFile(pathJoin(ROUTES_DIR, `${title}.routes.js`),
        `const express = require('express');
    const router = express.Router();
    const ${title}Validator = require('../validation/review')
    const { validate } = require('express-validation');
        ${(function createPaths() {
            let routesSourceCode = ""
            for (let i = 0; i < OpenApiDocumentation.tags.length; i++) {
                routesSourceCode = routesSourceCode.concat(`
const ${OpenApiDocumentation.tags[i].name} = require('../controllers/${OpenApiDocumentation.tags[i].name}.controller.js');
const ${OpenApiDocumentation.tags[i].name}Controller=new ${OpenApiDocumentation.tags[i].name}() \n`)
            }
            routesSourceCode = routesSourceCode.concat(`\n  \n`)
            const PathObject = OpenApiDocumentation.paths
            let pathname
            for (let i = 0; i < Object.keys(OpenApiDocumentation.tags).length; i++) {
                pathname = OpenApiDocumentation.tags[i].name
                let AllPaths = [];
                // console.log(OpenApiDocumentation.paths)
                for (let j = 0; j < DocumentationPaths.length; j++) {
                    // console.log(Object.keys(OpenApiDocumentation.paths)[j].slice(1, pathname.length + 1))
                    if (Object.keys(OpenApiDocumentation.paths)[j].slice(1, pathname.length + 1) == `${pathname}`) {
                        const hello = OpenApiDocumentation.paths[Object.keys(OpenApiDocumentation.paths)[j]]
                        for (let z = 0; z < Object.keys(hello).length; z++) {
                            let parameters = ""
                            let id = ""
                            let parametersFound = false
                            if (Object.keys(hello)[z] == 'get') {
                                const operation = hello[Object.keys(hello)[z]];
                                if (operation.hasOwnProperty("parameters")) {
                                    parametersFound = true
                                    id = id.concat(`${operation.parameters[0].name}`);
                                    parameters = parameters.concat(`by${id}`);
                                }
                            }
                            let validateRequired = false;
                            let validatation = ""
                            if (Object.keys(hello)[z] == 'post') {
                                const operation = hello[Object.keys(hello)[z]];

                                if (operation.hasOwnProperty("requestBody")) {
                                    if (operation.requestBody.content.hasOwnProperty('application/json')) {
                                        if (operation.requestBody.content['application/json'].schema.hasOwnProperty('required')) {
                                            validateRequired = true
                                            validatation = `create${operation.requestBody.content['application/json'].schema.xml.name}`
                                        }
                                    }


                                }


                            }



                            routesSourceCode = routesSourceCode.concat(`router.${Object.keys(hello)[z]}('${Object.keys(OpenApiDocumentation.paths)[j].replace('{', ':').replace('}', '')}',${validateRequired ? `validate(${title}Validator.${validatation}),` : " "}  ${pathname}Controller.${Object.keys(hello)[z]}${pathname}${parameters});  \n`)
                        }
                    }
                }
            }
            return routesSourceCode
        })()
        }
module.exports = router;
`);

    await writeFile(pathJoin(VALIDATION_DIR, `${title}.validation.js`), format.sync(`
const joi = require('joi');

const ${title}Validation = {
    ${(function CreateValidation() {

            let validationSourceCode = ""
            for (let i = 0; i < DocumentationPaths.length; i++) {
                const path = OpenApiDocumentation.paths[Object.keys(OpenApiDocumentation.paths)[i]]


                for (let j = 0; j < Object.keys(path).length; j++) {
                    const PathObject = path[Object.keys(path)[j]]
                    //console.log(PathObject)




                    // console.log((Object.keys(path)[j]))
                    let parameters

                    if (Object.keys(path)[j] == "post") {
                        const one = path[Object.keys(path)[j]];

                        if (one.hasOwnProperty('requestBody') == true) {

                            if (one.requestBody.content.hasOwnProperty('application/json')) {

                                if (one.requestBody.content['application/json'].schema.hasOwnProperty('required')) {
                                    validationSourceCode = validationSourceCode.concat(`
    create${one.requestBody.content['application/json'].schema.xml.name}: {
                                        `)
                                    const parameters = one.requestBody.content['application/json'].schema.required

                                    for (let z = 0; z < parameters.length; z++) {
                                        //console.log(one.requestBody.content['application/json'].schema.xml.name)
                                        const required = one.requestBody.content['application/json'].schema.properties
                                        //console.log(required[parameters[0]])
                                        validationSourceCode = validationSourceCode.concat(`
        ${parameters[z]}: joi.${required[parameters[z]].type}().required(),`)

                                    }

                                    validationSourceCode = validationSourceCode.concat(`
                                
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
            return validationSourceCode


        })()
        }
}
module.exports = ${title} Validation;
`    ));





})();
