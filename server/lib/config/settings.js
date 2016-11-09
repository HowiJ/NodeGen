module.exports = function(data) {
    var settings_str = `module.exports = {
        port: ${data.port},
        db: '${data.db}'
    };
`
    return settings_str;
}
