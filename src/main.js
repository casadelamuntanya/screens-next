import { createApp } from 'vue';
import RouterAnimations from 'vue-router-animations';
import i18n from './i18n';
import router from './router';
import DragScroll from './utils/directive.dragscroll';
import App from './App.vue';
import modules from './modules';

import 'reset-css';
import 'remixicon/fonts/remixicon.css';
import '@vueform/slider/themes/default.css';
import 'vue-router-animations/fade.css';
import './styles/main.scss';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(modules);

app.use(RouterAnimations, {
  router,
  namespace: 'animate',
});

app.directive('dragscroll', DragScroll);

app.mount('#app');

if (import.meta.env.PROD) {
  const element = document.getElementById('app');
  element.classList.add('production-ready');
  element.addEventListener('contextmenu', event => event.preventDefault());
}
