var archiver    = require('archiver'),
    zip         = archiver('zip');

module.exports = (function() {
    return {
        index: function(req, res) {
            res.send('<h1>/ Route in Creator Controller</h1>');
            res.end();
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
