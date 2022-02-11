import router from '/@/router';
import Guides from './Guides.vue';

export default {
  install(app, options = {}) {
    const { name, path = `/${name}` } = options;
    router.addRoute({ path, name, component: Guides });
  },
};
