//Module that is in charge of creating the package.json;
module.exports = function(data) {
    //Creating a string for the contents of package.json
    var package_json = "{";

    var pkg_dep = [];
    for (var i in data) {
        if (!i.includes('dependencies')) {
            package_json = package_json + `\n\t"${i}" : "${data[i]}",`
        } else {
            pkg_dep.push(data[i]);
        }
    }
    //add dependencies
    package_json = package_json + `\n\t"dependencies" : {`;

    package_json = package_json + `\n\t\t"express" : "^4.14.0"`;


    if (pkg_dep.length > 0) { package_json += "," };

    for (var i = 0; i < pkg_dep.length; i++) {
        package_json = package_json + `\n\t\t"${pkg_dep[i]}" : "^1.0.0"`;
        if (i < pkg_dep.length-1) { package_json += "," };
    }

    package_json = package_json + '\n\t}';

    package_json = package_json +   `\n}`;


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
