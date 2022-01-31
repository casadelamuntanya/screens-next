import config from '/@/config.yaml';

const modules = import.meta.glob('./*/index.js');

export default {
  install(app, globalOptions = {}) {
    config.modules.forEach(async (moduleOptions = {}) => {
      const options = { ...globalOptions, ...moduleOptions };
      const module = await modules[`./${options.name}/index.js`]?.();
      if (module) module.default.install(app, options);
    });
  },
};
