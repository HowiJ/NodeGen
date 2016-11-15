'use strict';
module.exports = function(data) {
    let models      = {};
    let controllers = {};
    let tracker     = [];

    function toControllerStr(obj, key) {
        let returnStr = `const mongoose = require('mongoose');\nconst ${key} = mongoose.model('${key}');\n\n`;

        returnStr = returnStr+`module.exports = (function() {
    return {
        index: function(req, res) {
            ${key}.find({}, function(err, data) {
                if (err) {
                    console.log('Something went wrong', err);
                    res.send(500);
                } else {
                    res.json({success: true, data: data});
                }
            })
        },
        show: function(req, res) {
            ${key}.findOne({_id: req.params.id}, function(err, data) {
                if (err) {
                    console.log('Something went wrong', err);
                    res.send(500);
                } else {
                    res.json({sucess: true, data: data});
                }
            })
        },
        create: function(req, res) {
            var new_${key} = new ${key}({`;

            for (let i in obj) {
                returnStr = returnStr + `\n\t\t\t\t${i}: req.body.${i},`;
            }
            returnStr = returnStr.substr(0, returnStr.length-1);

            returnStr = returnStr+`\n\t\t\t})

            new_${key}.save(function(err) {
                if (err) {
                    console.log('Something went wrong',err);
                    res.send(500);
                } else {
                    res.json({success: true});
                }
            })
        },
        update: function(req, res) {
            ${key}.findOne({_id: req.params.id}, function(err, data) {
                if (err) {
                    console.log('Something went wrong', err);
                    res.send(500);
                } else {
                    for (var i in req.body) {
                        if (data[i] != req.body[i]) {
                            data[i] = req.body[i];
                        }
                    }

                    data.save(function(err) {
                        if (err) {
                            console.log('Something went wrong', err);
                            res.send(500);
                        } else {
                            res.json({success: true});
                        }
                    })
                }
            })
        },
        destroy: function(req, res) {
            ${key}.findOne({_id: req.params.id}, function(err, data) {
                if (err) {
                    console.log('Something went wrong', err)
                    res.send(500);
                } else {
                    if (data) {
                        ${key}.remove(data, function(err) {
                            if (err) {
                                console.log('Something went wrong', err);
                                res.send(err);
                            } else {
                                res.json({success: true});
                            }
                        })
                    } else {
                        res.json({success: false, error: 'Could not find the specified user'});
                    }
                }
            })
        }
    }
}())`;

        return returnStr;
    }
    //Parses through data to an object for each model
    for (let i in data) {
        if (i.split('@').length > 1) {
            models[data[i]] = {};
            tracker[parseInt(i.split('@')[1])] = data[i];
        } else if (i.split('#').length > 1) {
            let mod = models[tracker[parseInt(i.split('#')[0])]];
            mod[i.split('#')[1]] = data[i];
        }
    }
    for (let i in models) {
        controllers[i] = toControllerStr(models[i], i);
    }

    return controllers;
}
