const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    mongo: {
        db: 'mongodb://localhost/links',
        options: {useNewUrlParser: true}
    }
};