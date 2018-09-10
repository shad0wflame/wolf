const util = require('util');

const loggerSymbol = Symbol("logger");
const writeFn = process.stdout.write;
class WolfLogger {

    constructor() {
        console.log = undefined;
        process.stdout.write = (sym, string, encoding, fd) => {
            if (sym === loggerSymbol) {
                writeFn.call(process.stdout, string, encoding, fd);
            }
        }
    }

    log() {
        process.stdout.write(loggerSymbol, `[ Wolf ]: \n ${util.format.apply(this, arguments)}\n`);
    }
}

const instance = new WolfLogger();

module.exports = instance;