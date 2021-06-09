<template>
	<ul v-if="isMain" class="nav-games">
		<li v-for="route in routes" :key="route.name">
			<router-link :to="`/play/${route.path}`">
				<p>{{ route.name }}</p>
			</router-link>
		</li>
	</ul>
	<section v-else>
		<router-link to="/play">Back</router-link>
	</section>
	<router-view />
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
	name: 'PlaygroundMenu',
	setup() {
		const { getRoutes, currentRoute } = useRouter();
		const isMain = computed(() => currentRoute.value.name === 'play');
		const { children: routes } = getRoutes().find(({ name }) => name === 'play');
		return { routes, isMain };
	},
};
</script>
