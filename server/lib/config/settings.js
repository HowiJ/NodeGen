module.exports = function(data) {
    var settings_str = `module.exports = {
    //Port which Node will be runnning off of
    port: ${data.port},
    //Database name for the mongo DB
    db: '${data.db}'
};
`
    return settings_str;
}
