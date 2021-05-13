<template>
	<section class="stack">
		<div id="explore" class="map" />
	</section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useMap } from '/@/components/map';
import config from '/@/config/views/explore.yaml';
export default {
	name: 'Explore',
	setup() {
		const map = ref(undefined);

		onMounted(() => {
			map.value = useMap('explore', {
				...config.map,
				// Parse tiles and inject Mapbox token
				tiles: config.map.tiles.map(({ options, ...rest }) => {
					const accessToken = import.meta.env[options.token];
					return { ...rest, options: { ...options, accessToken } };
				}),
			});
		});

		return {};
	},
};
</script>
