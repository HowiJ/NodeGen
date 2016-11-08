const path = require('path');

module.exports = (function(){
    return {
        index: function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/index.html'));
        }
    }
}())
