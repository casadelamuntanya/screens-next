<template>
	<section class="stack">
		<div id="explore" class="map" />
	</section>
	<section data-tag-pre="trails">
		<ul class="scroller" v-dragscroll>
			<li
				v-for="trail in trails"
				:key="trail"
				@click="loadTrail(trail)"
				class="card">
				<figure class="cover faded">
					<img :src="trail.img[0].thumbnails.large.url">
				</figure>
				<h4>{{ trail[`name__${locale}`] }}</h4>
			</li>
		</ul>
	</section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMap, useGeoJSON, useAnimations } from '/@/components/map';
import airtable from '/@/apis/airtable';
import config from '/@/config/views/explore.yaml';

const api = airtable(config.api.base);

export default {
	name: 'Explore',
	setup() {
		const { locale } = useI18n();

		const geojson = reactive({});
		const trails = ref([]);
		const activeTrail = ref(undefined);

		const loadTrail = trail => {
			activeTrail.value = trail;
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

		return { locale, trails, activeTrail, loadTrail };
	},
};
</script>
