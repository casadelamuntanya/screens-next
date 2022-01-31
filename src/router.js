import { createRouter, createWebHistory } from 'vue-router';
import Home from '/@/views/Home.vue';
import About from '/@/views/About.vue';
import Safety from '/@/views/safety/Safety.vue';
import SafetyRoutes from '/@/views/safety/routes';
import Discover from '/@/views/Discover.vue';
import Explore from '/@/views/explore/Explore.vue';
import Guides from '/@/views/Guides.vue';
import Play from '/@/views/play/Play.vue';
import PlayRoutes from '/@/views/play/routes';
import NotFound from '/@/views/NotFound.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/safety', component: Safety, children: SafetyRoutes },
    { path: '/discover', component: Discover },
    { path: '/explore', component: Explore },
    { path: '/guides', component: Guides },
    { path: '/play', name: 'play', component: Play, children: PlayRoutes },
    { path: '/:pathMatch(.*)', component: NotFound },
  ],
});
