import router from '/@/router';
import Discover from './Discover.vue';

export default {
  install(app, options = {}) {
    const { name, path = `/${name}` } = options;
    router.addRoute({ path, name, component: Discover });
  },
};
