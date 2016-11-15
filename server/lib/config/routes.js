'use strict';
module.exports = function(data, models) {
    let modelsObj   = {};
    let tracker     = [];
    for (let i in models) {
        if (i.split('@').length > 1) {
            modelsObj[models[i]] = {};
            tracker[parseInt(i.split('@')[1])] = models[i];
        } else if (i.split('#').length > 1) {
            let mod = modelsObj[tracker[parseInt(i.split('#')[0])]];
            mod[i.split('#')[1]] = models[i];
        }
    }


    let routes = `const path = require('path');`;
    if (modelsObj) {
        for (let i in modelsObj) {
            routes = routes + `\nconst ${i} = require('../controllers/${i.toLowerCase()}.js');`;
        }
    }

    routes = routes + `\nmodule.exports = function(app) {
    //Main route
    app.get('/', function(req, res) {
        res.send('<h1>Hello World</h1>');
        res.end();
    });`

    if (modelsObj) {
        for (let i in modelsObj) {
            routes = routes + `\n\n\tapp.get('/${i.toLowerCase()}s', function(req, res) {
        ${i}.index(req, res);
    });\n\tapp.get('/${i.toLowerCase()}s/:id', function(req, res) {
        ${i}.show(req, res);
    });\n\tapp.post('/${i.toLowerCase()}s', function(req, res) {
        ${i}.create(req, res);
    });\n\tapp.put('/${i.toLowerCase()}s/:id', function(req, res) {
        ${i}.update(req, res);
    });\n\tapp.delete('/${i.toLowerCase()}s/:id', function(req, res) {
        ${i}.destroy(req, res);
    })\n`;
        }
    }

    routes = routes + `\n}`;

    return routes;
}
