import { createApp } from 'vue';
import i18n from './i18n';
import router from './router';
import DragScroll from './utils/directive.dragscroll';
import App from './App.vue';

import 'reset-css';
import 'remixicon/fonts/remixicon.css';
import '@vueform/slider/themes/default.css';
import './styles/main.scss';

const app = createApp(App);
app.use(i18n);
app.use(router);

app.directive('dragscroll', DragScroll);

app.mount('#app');
