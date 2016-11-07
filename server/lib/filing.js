class PackageJson {
    var necessities = {name: false };
    var notvalid = false;

    constructor(data) {
        this.fileStr = '{';
        this.fileStr = this.fileStr + '"name": "'+data.name+'"';
    }

    createFile() {
        this.fileStr = this.fileStr+'}';
        return this.fileStr
    }
}
module.exports = function(data) {

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
