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
            throw new TypeError('Classes extending the widget abstract class.')
        }

        _private.set(this, {
            /** @private { Map<String, Array<WolfTSLintError>> } _errors **/
            _errors: new Map()
        });
    }

    addErrors(err) {
        const _errors = _private.get(this)._errors;
        if (_errors.has(err.fileName)) {
            _errors.get(err.fileName).push(err);
        } else {
            _errors.set(err.fileName, [err]);
        }
    }

    getErrors() {
        return _private.get(this)._errors;
    }

}

module.exports = {WolfLinter: WolfLinter, WolfLinterError: WolfLinterError};