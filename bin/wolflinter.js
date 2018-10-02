let _private = new WeakMap();

class WolfLinterError {

    constructor(failure, fileName, ruleName, startPosition) {
        this.failure = failure;
        this.fileName = fileName;
        this.ruleName = ruleName;
        this.startPosition = startPosition;
    }
}

class WolfLinter {
    constructor(){
        if (this.constructor === WolfLinter) {
            throw new TypeError('Abstract class "WolfLinter" cannot be instantiated directly.');
        }

        if (this.track === undefined) {
            throw new TypeError(`${this.constructor.name} extends WolfLinter abstract class and needs to implement the "track" function.`);
        }

        _private.set(this, {
            /** @private { Map<String, Array<WolfTSLintError>> } _errors **/
            _errors: {}
        });
    }

    addErrors(err) {
        const _errors = _private.get(this)._errors;
        if (!_errors.hasOwnProperty(err.fileName)) {
            _errors[err.fileName] = [];
        }

        _errors[err.fileName].push(err);
    }

    getErrors() {
        return _private.get(this)._errors;
    }

}

module.exports = {WolfLinter, WolfLinterError};