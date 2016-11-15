'use strict';
//Archiver for files
const archiver    = require('archiver');
const http        = require('http');

//debug mode
const debug       = true;
//Archiver for the zip file

//Structure of modularization
const structure   = require('../lib/structure.js');
module.exports = (function() {
    return {
        index: function(req, res) {
            //Testing route atm.
            res.send('<h1>/ Route in Creator Controller</h1>');
            res.end();
        },
        server: function(req, res) {
            const zip  = archiver('zip');
            const data = req.body;

            var details  = {};
            var database = false;

            console.log(data);

            //Takes the req.body and splits it up to sub groups
            for (var i in data) {
                //Split of the thing where 0 is the parent folder and 1 is the subclass
                if (data[i]) {
                    var current = i.split('_');
                    if (!details[current[0]]) {
                        details[current[0]] = {};
                    }
                    if (current.length > 2) {
                        details[current[0]][current[1]+'_'+current[2]] = data[i];
                    } else {
                        details[current[0]][current[1]] = data[i];
                    }
                }
            }
            details.server.name = details.package.name;
            details.config = {settings: {port: details.server.port, db: details.database.name}}

            if (details.database && details.database.use && details.database.use == 'on') {
                console.log('USING DATABASE')
                database = true;
            }

            ////////////////////////////////////////////////////////////
            //                         Models                         //
            ////////////////////////////////////////////////////////////
            // if (datbase) {

            // }

            //Each File as a string.
            //Root folder
            const packageJson = require('../lib/package.js')(details.package, database?true:false);
            const serverJs    = require('../lib/server.js')(details.server, database?true:false);
                //Config Folder
                const settingsJs  = require('../lib/config/settings.js')(details.config.settings);
                const routesJs    = require('../lib/config/routes.js')(details.config.settings);
                const mongooseJs  = require('../lib/config/mongoose.js')();
                const modelsObj   = require('../lib/models.js')(details.model);

            details.output = {
                packageJson : JSON.parse(packageJson),
                serverJs    : serverJs,
                settings    : settingsJs,
                routesJs    : routesJs
            }
            if (database) {
                console.log('USING DB');
                details.output['mongooseJs'] = mongooseJs;
                details.output['models']     = modelsObj;
            }

            if (debug) {
                res.send(details);
            } else {
                console.log('-----------------------------------\n');

                // Pipe the archiver('zip');
                zip.pipe(res);

                //Append to zip a bunch of things before finalizing it to be sent;
                zip .append(packageJson, { name: structure.package })
                    .append(serverJs,    { name: structure.server  })
                        .append(settingsJs,     { name: structure.settings })
                        .append(routesJs,       { name: structure.routes   })

                if (database) {
                    zip .append(mongooseJs,     { name: structure.mongoose })
                        .append(null,           { name: structure.models   })

                    for (let i in details.output.models) {
                        zip .append(details.output.models[i], { name: structure.models+i.toLowerCase()+'.js' });
                    }
                }

                zip.finalize();
            }
        }
    }
}())
