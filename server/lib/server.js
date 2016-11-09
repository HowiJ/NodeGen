module.exports = function(data) {
    const server_str = `
    //All of the constants we need to require;
    const bodyParser  = require('body-parser');
    const express     = require('express');
    const moment      = require('moment');
    const port        = ${data.port};
    const path        = require('path');
    const app         = express();

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, './client')));


    app.listen(port, function() {
        console.log(moment().format('MMMM Do, YYYY : h:mm:ss a'));
        console.log('Archiver on port:', port);
    })`;

    return server_str;
}

// require('./server/config/routes.js')(app);
