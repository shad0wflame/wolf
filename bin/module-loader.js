const fs = require('fs');
const path = require('path');

class ModuleLoader {
    constructor(){
        this.modules = [];
    }

    import(){
        fs.readdirSync(modulesPath).forEach((folder) => {
            this.modules.push(require(path.join(modulesPath, folder)));
        });
    }
}

module.exports = ModuleLoader;
