<template>
	<div class="app">
		<header class="app__header">
			<router-link to="/" class="app__logo">
				<inline-svg src="/images/vectors/logo.svg" />
			</router-link>
			<nav-locale />
		</header>
		<main class="stack">
			<router-view />
		</main>
	</div>
</template>

<script>
import InlineSvg from 'vue-inline-svg';
import NavLocale from '/@/layouts/NavLocale.vue';

export default {
	name: 'App',
	components: { InlineSvg, NavLocale },
	setup() {
		return {};
	},
};
</script>
