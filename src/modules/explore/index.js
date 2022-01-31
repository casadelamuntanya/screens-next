import router from '/@/router';
import Explore from './Explore.vue';

export default {
  install(app, options = {}) {
    const { name, path = `/${name}` } = options;
    router.addRoute({ path, name, component: Explore });
  },
};
