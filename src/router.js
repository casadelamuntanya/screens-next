import { createRouter, createWebHistory } from 'vue-router';
import Home from '/@/views/Home.vue';
import About from '/@/views/About.vue';
import NotFound from '/@/views/NotFound.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/:pathMatch(.*)', component: NotFound },
	],
});

export default router;
