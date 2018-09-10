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

    debug(string, encoding, fd) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.DEBUG)) {
            _log(chalk.blue.bold('[ Wolf - DEBUG ]:'), string, encoding, fd);
        }
    }

    warn(string, encoding, fd) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.WARN)) {
            _log(chalk.yellow.bold('[ Wolf - WARNING ]:'), string, encoding, fd);
        }
    }

    error(string, encoding, fd) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.ERROR)) {
            _log(chalk.red.bold('[ Wolf - ERROR ]:'), string, encoding, fd);
        }
    }
}

function _log(header, string, encoding, fd) {
    let _date = new Date();
    if (string.length === 0) {
        process.stdout.write('\n', encoding, fd, loggerSymbol);
    } else {
        process.stdout.write(`${chalk.yellow.bold(`[${_date.toLocaleString()}]`)}${header} \n ${util.format.apply(this, [string])}\n`, encoding, fd, loggerSymbol);
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