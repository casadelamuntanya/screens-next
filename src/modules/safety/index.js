import router from '/@/router';
import children from './routes';
import Safety from './Safety.vue';

export default {
  install(app, options = {}) {
    const { name, path = `/${name}` } = options;
    router.addRoute({ path, name, component: Safety, children });
  },
};
