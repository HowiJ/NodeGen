const creator = require('../controllers/creator.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        creator.index(req, res);
    })
    app.get('/server', function(req, res) {
        creator.server(req, res);
    })
    app.get('/test', function(req, res) {
        creator.test(req, res);
    })
}
