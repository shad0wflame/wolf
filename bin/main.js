const ModuleLoader = require('./module-loader');

const loader = new ModuleLoader();
loader.import();

console.log(loader);

loader.modules.forEach((module) => {
    let instance = new module();
    instance.track();
    console.log(instance.getErrors());
});


