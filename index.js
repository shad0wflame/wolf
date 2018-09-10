'use strict';

const path = require('path');

// SET GLOBAL CONSTANTS
global['rootPath'] = __dirname;
global['binPath'] = path.join(rootPath, 'bin');
global['logger'] = require(path.join(binPath, 'logger'));

module.exports = require('./bin/main');