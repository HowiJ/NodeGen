module.exports = function(data) {
    const server_str = `//////////////////////////////////////////////////////////
//                      Requires                        //
//////////////////////////////////////////////////////////
const bodyParser  = require('body-parser');
const express     = require('express');
const moment      = require('moment');
const port        = ${data.port};
const path        = require('path');
const app         = express();

////////////////////////////////////////////////////////////
//             App.use (Body Parser, Static)              //
////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client")));

////////////////////////////////////////////////////////////
//                        Mongoose                        //
////////////////////////////////////////////////////////////
require('./server/config/mongoose.js');
////////////////////////////////////////////////////////////
//                         Routes                         //
////////////////////////////////////////////////////////////
require('./server/config/routes.js')(app)

////////////////////////////////////////////////////////////
//                     Listen to Port                     //
////////////////////////////////////////////////////////////
app.listen(port, function() {
    console.log(moment().format('MMMM Do, YYYY : h:mm:ss a'));
    console.log("${data.name}! ("+port+")");
})`;
//Require port
//require(path.join(__dirname,"./server/config/settings.js")).port;
    return server_str;
}

// require('./server/config/routes.js')(app);
