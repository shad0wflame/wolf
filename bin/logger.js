const util = require('util');
const fs = require('fs');
const chalk = require('chalk');

const loggerSymbol = Symbol("logger");
const ogWriteFn = process.stdout.write;
const date = new Date();
const wStream = fs.createWriteStream(`${date.toLocaleDateString()}_3rd-party-log`);
class WolfLogger {

    constructor() {
        console.log = undefined;
        process.stdout.write = _writeFn;
        process.stderr.write = _writeFn;
    }

    log() {
        process.stdout.write(`${chalk.blue.bold('[ Wolf - INFO ]:')} \n ${util.format.apply(this, arguments)}\n`, null, null, loggerSymbol);
    }

    err() {
        process.stdout.write(`${chalk.red.bold('[ Wolf - ERROR ]:')} \n ${util.format.apply(this, arguments)}\n`, null, null, loggerSymbol);
    }
}

function _writeFn (string, encoding, fd, sym) {
    if (sym === loggerSymbol) {
        ogWriteFn.call(process.stdout, string, encoding, fd, sym);
    } else {
        let _date = new Date();
        wStream.write(`${_date.toLocaleString()} \n ${string} \n`);
    }
}

const instance = new WolfLogger();

module.exports = instance;