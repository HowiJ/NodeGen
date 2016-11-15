//Module that is in charge of creating the package.json;
module.exports = function(data, db) {
    //Creating a string for the contents of package.json
    var package_json = "{";

    var pkg_dep = [];
    for (var i in data) {
        if (!i.includes('dependencies')) {
            package_json = package_json + `\n\t"${i}" : "${data[i]}",`
        } else {
            //For custom Dependencies, which we won't do atm.
            // pkg_dep.push(data[i]);
        }
    }
    //add dependencies
    package_json = package_json + `\n\t"dependencies" : {`;
    package_json = package_json + `\n\t\t"express" : "^4.14.0",`;
    package_json = package_json + `\n\t\t"body-parser" : "^1.15.2",`;
    package_json = package_json + `\n\t\t"moment" : "^2.15.2"`;
    if (db) {
        package_json = package_json + `,\n\t\t"mongoose" : "^4.6.6"`;
    }

    //For custom Dependencies
    // if (pkg_dep.length > 0) { package_json += "," };
    // for (var i = 0; i < pkg_dep.length; i++) {
    //     package_json = package_json + `\n\t\t"${pkg_dep[i]}" : "^1.0.0"`;
    //     if (i < pkg_dep.length-1) { package_json += "," };
    // }

    package_json = package_json + '\n\t}\n}';

    //Returns a string with the package.json data.
    return package_json;
}
