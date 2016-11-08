//Archiver for files
const archiver    = require('archiver');
//Archiver for the zip file
const zip         = archiver('zip');

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
            //Form data
            const data = req.body;
            console.log(data);

            //Each File as a string.
            const packageJson = require('../lib/package.js')(data.package.name);

            //Pipe the archiver('zip');
            zip.pipe(res);

            //Append to zip a bunch of things before finalizing it to be sent;
            // res.send(packageJson);
            zip.append(packageJson, { name: structure.package}).finalize();
        },
        test: function(req, res) {
            //Testing route atm.
            console.log('test route');

            zip.pipe(res);

            zip .append('testfile1.', { name: 'one.txt' })
                .append('testfile2.', { name: 'server/two.txt' })
                .append('static3', { name: 'three.txt' }).finalize();
        }
    }
}())
