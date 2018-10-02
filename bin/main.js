const ModuleLoader = require('./module-loader');
const fs = require('fs');

const date = new Date();
const wStream = fs.createWriteStream(`${date.toLocaleDateString()}_report-log`);

// TODO: Connexio amb GIT.
const loader = new ModuleLoader();
loader.import();

logger.debug(loader);

loader.modules.forEach((module) => {
    let instance = new module();
    instance.track();

    logger.debug(instance.getErrors());
    wStream.write(`${JSON.stringify(instance.getErrors(), null, 4)}\n`);
});


