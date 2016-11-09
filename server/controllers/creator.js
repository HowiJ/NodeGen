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

            var details = {};

            console.log(data);

            //Takes the req.body and splits it up to sub groups
            for (var i in data) {
                //Split of the thing where 0 is the parent folder and 1 is the subclass
                var current = i.split('_');
                if (!details[current[0]]) {
                    details[current[0]] = {};
                }
                details[current[0]][current[1]] = data[i];
            }
            details.server.name = details.package.name;
            details.config = {settings: {port: details.server.port, db: details.database.name}}

            //Each File as a string.
            const packageJson = require('../lib/package.js')(details.package);
            const serverJs    = require('../lib/server.js')(details.server);
            const settingsJs  = require('../lib/config/settings.js')(details.config.settings);

            details.output = {
                packageJson : JSON.parse(packageJson),
                serverJs    : serverJs,
                settings    : settingsJs
            }

            if (debug) {
                res.send(details);
            } else {
                console.log('-----------------------------------\n');
                console.log(packageJson);

                // Pipe the archiver('zip');
                zip.pipe(res);

                //Append to zip a bunch of things before finalizing it to be sent;
                zip .append(packageJson, { name: structure.package })
                    .append(serverJs, { name: structure.server })
                        .append(settingsJs, { name: structor.settings })
                .finalize();
            }
        },
        test: function(req, res) {
            //Creates a new instance of archiver('zip');
            const zip  = archiver('zip');
            //Testing route atm.
            console.log('test route');

            zip.pipe(res);

            zip .append('testfile1.', { name: 'one.txt' })
                .append('testfile2.', { name: 'server/two.txt' })
                .append('static3', { name: 'three.txt' }).finalize();
        }
    }
}())
