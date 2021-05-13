<template>
	<section class="stack">
		<div id="explore" class="map" />
	</section>
	<section data-tag="trails">
		<button
			v-for="trail in trails"
			:key="trail"
			@click="loadTrail(trail)">
			{{ trail.name__ca }}
		</button>
	</section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useMap, useGeoJSON, useAnimations } from '/@/components/map';
import airtable from '/@/apis/airtable';
import config from '/@/config/views/explore.yaml';

const api = airtable(config.api.base);

export default {
	name: 'Explore',
	setup() {
		const geojson = reactive({});
		const trails = ref([]);

		const loadTrail = trail => {
			const { track: [{ url }]} = trail;
			geojson.layers.removeLayer('trail');
			geojson.layers.addLayer(url, {
				name: 'trail',
				className: 'explore-route',
				onLoad: geojson.animations.tracePath,
			});
		};

		onMounted(async () => {
			const map = useMap('explore', {
				...config.map,
				// Parse tiles and inject Mapbox token
				tiles: config.map.tiles.map(({ options, ...rest }) => {
					const accessToken = import.meta.env[options.token];
					return { ...rest, options: { ...options, accessToken } };
				}),
			});

			geojson.layers = useGeoJSON(map);
			geojson.animations = useAnimations(map);

			trails.value = await api.get(config.api.tables.trails);
		});

		return { trails, loadTrail };
	},
};
</script>
