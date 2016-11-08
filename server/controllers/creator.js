const archiver    = require('archiver');
const zip         = archiver('zip');

module.exports = (function() {
    return {
        index: function(req, res) {
            res.send('<h1>/ Route in Creator Controller</h1>');
            res.end();
        },
        server: function(req, res) {
            //Each File as a string.
            const packageJson = require('../lib/package.js')({name: "Tester"});
            //Pipe the archiver('zip');
            zip.pipe(res);
            //Append to zip a bunch of things before finalizing it to be sent;
            // res.send(packageJson);
            zip.append(packageJson, { name: 'package.json'}).finalize();
        },
        test: function(req, res) {
            console.log('test route');

            zip.pipe(res);

            zip .append('testfile1.', { name: 'one.txt' })
                .append('testfile2.', { name: 'server/two.txt' })
                .append('static3', { name: 'three.txt' }).finalize();
        }
    }
}())
