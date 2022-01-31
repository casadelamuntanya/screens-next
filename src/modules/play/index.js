import router from '/@/router';
import children from './routes';
import Playground from './Playground.vue';

export default {
  install(app, options = {}) {
    const { name, path = `/${name}` } = options;
    router.addRoute({ path, name, component: Playground, children });
  },
};
