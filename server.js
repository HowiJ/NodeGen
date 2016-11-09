//All of the constants we need to require;
const bodyParser  = require('body-parser');
const express     = require('express');
const moment      = require('moment');
const port        = require('./server/config/settings.js').port;
const path        = require('path');
const app         = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));

require('./server/config/routes.js')(app);

app.listen(port, function() {
    console.log(moment().format('MMMM Do, YYYY : h:mm:ss a'));
    console.log('Archiver on port:', port);
})
