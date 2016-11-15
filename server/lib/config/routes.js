'use strict';
module.exports = function(data) {
    let routes = `const path = require('path');
    
module.exports = function(app) {
    //Main route
    app.get('/', function(req, res) {
        res.send('<h1>Hello World</h1>');
        res.end();
    })
}`;

    return routes;
}
