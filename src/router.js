import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)', component: () => import('./views/NotFound.vue') },
  ],
});
