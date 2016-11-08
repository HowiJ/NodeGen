const bodyParser  = require('body-parser');
const express     = require('express');
const moment      = require('moment');
const port        = require('./server/config/settings.js').port;
const app         = express();

require('./server/config/routes.js')(app);

app.listen(port, function() {
    console.log(moment().format('MMMM Do, YYYY : h:mm:ss a'));
    console.log('Archiver on port:', port);
})
