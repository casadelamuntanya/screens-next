<template>
	<ul class="nav-bar">
		<li v-for="page in pages" :key="page.name">
			<router-link :to="`/safety/${page.path}`">
				{{ t(`safety.pages.${page.name}`) }}
			</router-link>
		</li>
	</ul>
	<router-view />
</template>

<script>
import { useI18n } from 'vue-i18n';
import pages from './safety/routes';

export default {
	name: 'Safety',
	setup() {
		const { t } = useI18n();
		return { t, pages };
	},
};
</script>
