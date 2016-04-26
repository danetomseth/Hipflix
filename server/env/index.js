var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');

console.log("************************************", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else {
    module.exports = require(devConfigPath);
}
