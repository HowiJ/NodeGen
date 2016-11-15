'use strict';
module.exports = function(data) {
    //Array of model strings
    let mStrObj = {};
    //object of each model
    let models  = {};
    //unused
    let tracker = [];
    //unused
    function toModelStr (obj, key) {
        let returnStr =`const mongoose = require('mongoose');\nconst Schema = mongoose.Schema;\n\nconst ${key}Schema = new Schema({`;
        for (let i in obj) {
            returnStr = returnStr + `\n\t${i}: {type: ${obj[i]}},`;
        };
        returnStr = returnStr.substr(0, returnStr.length-1);
        returnStr = returnStr + `\n})\n\nmongoose.model('${key}', ${key}Schema);`;

        console.log(returnStr);
        return returnStr;
    }

    //Parses through
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
        mStrObj[i] = toModelStr(models[i], i);
    }

    return mStrObj;
}
