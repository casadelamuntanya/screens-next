import { createRouter, createWebHistory } from 'vue-router';
import Home from '/@/views/Home.vue';
import About from '/@/views/About.vue';
import Safety from '/@/views/Safety.vue';
import Explore from '/@/views/Explore.vue';
import NotFound from '/@/views/NotFound.vue';

import SafetyRoutes from '/@/views/safety/routes';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/safety', component: Safety, children: SafetyRoutes },
		{ path: '/explore', component: Explore },
		{ path: '/:pathMatch(.*)', component: NotFound },
	],
});

export default router;
