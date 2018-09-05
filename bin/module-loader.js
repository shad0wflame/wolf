const fs = require('fs');
const path = require('path');
const rootPath = path.join(__dirname, '..');

class ModuleLoader {
    constructor(){
        this.modules = [];
        this.modulesPath = path.join(rootPath, 'modules');
    }

    import(){
        fs.readdirSync(this.modulesPath).forEach((folder) => {
            this.modules.push(require(path.join(this.modulesPath, folder)));
        });
    }
}

module.exports = ModuleLoader;
