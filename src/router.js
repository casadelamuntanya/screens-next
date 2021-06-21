import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '/@/views/Home.vue';
import About from '/@/views/About.vue';
import Safety from '/@/views/Safety.vue';
import SafetyRoutes from '/@/views/safety/routes';
import Explore from '/@/views/Explore.vue';
import Guides from '/@/views/Guides.vue';
import Play from '/@/views/Play.vue';
import PlayRoutes from '/@/views/play/routes';
import NotFound from '/@/views/NotFound.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/safety', component: Safety, children: SafetyRoutes },
		{ path: '/explore', component: Explore },
		{ path: '/guides', component: Guides },
		{ path: '/play', name: 'play', component: Play, children: PlayRoutes },
		{ path: '/:pathMatch(.*)', component: NotFound },
	],
});

// Trigger enter animates
router.afterEach(async () => {
	await nextTick();
	const elements = Array.from(document.querySelectorAll('[data-animate]')) || [];
	elements.forEach(el => {
		const { animate = 'fade', animateDelayIn = '0s' } = el.dataset;
		el.style.setProperty('--animate-animation', `${animate}-in`);
		el.style.setProperty('--animate-delay', animateDelayIn);
		el.classList.add('animate-in');
	});
});

// Trigger leave animates
router.beforeEach(async () => {
	const elements = Array.from(document.querySelectorAll('[data-animate]')) || [];
	await Promise.all(elements.map(el => new Promise(resolve => {
		const { animate = 'fade', animateDelayOut = '0s' } = el.dataset;
		el.style.setProperty('--animate-animation', `${animate}-out`);
		el.style.setProperty('--animate-delay', animateDelayOut);
		el.classList.add('animate-out');
		el.addEventListener('animationend', () => resolve());
	})));
});

export default router;
