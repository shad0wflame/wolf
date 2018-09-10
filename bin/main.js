const ModuleLoader = require('./module-loader');

const loader = new ModuleLoader();
loader.import();

logger.debug(loader);

loader.modules.forEach((module) => {
    let instance = new module();
    instance.track();
    logger.debug(instance.getErrors());
});


