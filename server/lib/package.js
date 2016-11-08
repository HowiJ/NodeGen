//Module that is in charge of creating the package.json;
module.exports = function(data) {
    //Creating a string for the contents of package.json
    var package_json = `{
    "name" : "${data.name}",
    "version" : "1.0.0",
    "license" : "ISC"
}`


    //Returns a string with the package.json data.
    return package_json;
}
/*

{
  "name": "07112016_test",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "Howard Jiang <me@howardjiang.com> (http://howardjiang.com)",
  "license": "ISC",
  "dependencies": {
    "archiver": "^1.2.0",
    "body-parser": "^1.15.2",
    "express": "^4.14.0",
    "moment": "^2.15.2"
  }
}

*/
