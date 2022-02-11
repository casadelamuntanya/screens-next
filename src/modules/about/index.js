import router from '/@/router';
import About from './About.vue';

export default {
  install(app, options = {}) {
    const { name, path = `/${name}` } = options;
    router.addRoute({ path, name, component: About });
  },
};
