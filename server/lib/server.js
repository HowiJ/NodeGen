module.exports = function(data, db) {
    var server_str = `//////////////////////////////////////////////////////////
//                      Requires                        //
//////////////////////////////////////////////////////////
const bodyParser  = require('body-parser');
const express     = require('express');
const moment      = require('moment');
const path        = require('path');
const port        = require(path.join(__dirname,"./server/config/settings.js")).port;;
const app         = express();

////////////////////////////////////////////////////////////
//             App.use (Body Parser, Static)              //
////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client")));

////////////////////////////////////////////////////////////
//                        Mongoose                        //
////////////////////////////////////////////////////////////
`;
if (db) {
    server_str = server_str +`require('./server/config/mongoose.js');`;
}
server_str = server_str + `
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
