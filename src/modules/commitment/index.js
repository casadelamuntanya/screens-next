import router from '/@/router';
import Commitment from './Commitment.vue';

export default {
  install(app, options = {}) {
    const { name, path = `/${name}` } = options;
    router.addRoute({ path, name, component: Commitment });
  },
};
