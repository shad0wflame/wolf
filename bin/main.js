const ModuleLoader = require('./module-loader');
const logger = require('./logger');

const loader = new ModuleLoader();
loader.import();

logger.log(loader);

loader.modules.forEach((module) => {
    let instance = new module();
    instance.track();
    logger.log(instance.getErrors());
});


