const ModuleLoader = require('./module-loader');

const loader = new ModuleLoader();
loader.import();

logger.log(loader);

loader.modules.forEach((module) => {
    let instance = new module();
    instance.track();
    logger.log(instance.getErrors());
});


