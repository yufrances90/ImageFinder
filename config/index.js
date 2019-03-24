const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('./config/ms-credentials.env'));

module.exports = envConfig;