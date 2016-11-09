const creator = require('../controllers/creator.js');
const viewer  = require('../controllers/viewer.js');

module.exports = function(app) {
    //Route to send the zip file
    app.post('/node_server', function(req, res) {
        creator.server(req, res);
    })
    app.get('/test', function(req, res) {
        creator.test(req, res);
    })


    //All other routes go to the view page so angular can handle the routing.
    app.get('/*', function(req, res) {
        res.redirect('/');
    })
}
