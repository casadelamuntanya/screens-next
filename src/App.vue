<template>
	<div class="app">
		<header class="app__header">
			<router-link to="/" class="app__logo">
				<img src="/images/vectors/logo.svg">
			</router-link>
			<nav-locale />
		</header>
		<main class="app__main center">
			<router-view />
		</main>
	</div>
</template>

<script>
import NavLocale from '/@/views/NavLocale.vue';

export default {
	name: 'App',
	components: { NavLocale },
	setup() {
		return {};
	},
};
</script>
