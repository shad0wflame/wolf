'use strict';

const path = require('path');

// SET GLOBAL CONSTANTS
global['rootPath'] = __dirname;
global['binPath'] = path.join(rootPath, 'bin');
global['modulesPath'] = path.join(rootPath, 'modules');

const { instance, levels } = require(path.join(binPath, 'logger'));
global['logger'] = instance;
global['LoggerLevels'] = levels;

process.on('uncaughtException', (err) => {
   logger.error(err);
});

module.exports = require('./bin/main');