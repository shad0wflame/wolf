const util = require('util');
const fs = require('fs');
const chalk = require('chalk');

const loggerSymbol = Symbol("logger");
const ogWriteFn = process.stdout.write;
const date = new Date();
const wStream = fs.createWriteStream(`${date.toLocaleDateString()}_3rd-party-log`);

const LoggerLevels = Object.freeze({
    DEBUG: Symbol("debug"),
    WARN: Symbol("warn"),
    ERROR: Symbol("error")
});

const _private = new WeakMap();
class WolfLogger {

    constructor() {
        console.log = undefined;
        console.error = undefined;
        process.stdout.write = _writeFn;
        process.stderr.write = _writeFn;

        _private.set(this, {

            /** @private { typeof LoggerLevels } _level **/
            _level: LoggerLevels.DEBUG,

            /** @private { Function } _shouldLog **/
           _shouldLog:  (presentLevel, permission) => {
                switch(presentLevel) {
                    case LoggerLevels.DEBUG:
                        return true;
                    case LoggerLevels.WARN:
                        return permission !== LoggerLevels.DEBUG;
                    case LoggerLevels.ERROR:
                        return permission !== LoggerLevels.DEBUG && permission !== LoggerLevels.WARN;
                }
            }
        });
    }

    get level() {
        return _private.get(this)._level;
    }

    set level(_level) {
        if (Object.values(LoggerLevels).indexOf(_level) !== -1) {
            _private.get(this)._level = _level;
        }
    }

    debug() {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.DEBUG)) {
            let _date = new Date();
            process.stdout.write(`${chalk.yellow.bold(`[${_date.toLocaleString()}]`)}${chalk.blue.bold('[ Wolf - DEBUG ]:')} \n ${util.format.apply(this, arguments)}\n`, null, null, loggerSymbol);
        }

    }

    warn() {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.WARN)) {
            let _date = new Date();
            process.stdout.write(`${chalk.yellow.bold(`[${_date.toLocaleString()}]`)}${chalk.yellow.bold('[ Wolf - WARNING ]:')} \n ${util.format.apply(this, arguments)}\n`, null, null, loggerSymbol);
        }
    }

    error() {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.ERROR)) {
            let _date = new Date();
            process.stdout.write(`${chalk.yellow.bold(`[${_date.toLocaleString()}]`)}${chalk.red.bold('[ Wolf - ERROR ]:')} \n ${util.format.apply(this, arguments)}\n`, null, null, loggerSymbol);
        }
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

module.exports = {instance: instance, levels: LoggerLevels};