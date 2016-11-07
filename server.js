var bodyParser  = require('body-parser'),
    express     = require('express'),
    moment      = require('moment'),
    port        = require('./server/config/settings.js').port,
    app         = express();

require('./server/config/routes.js')(app);

app.listen(port, function() {
    console.log(moment().format('MMMM Do, YYYY : h:mm:ss a'));
    console.log('Archiver on port:', port);
})
