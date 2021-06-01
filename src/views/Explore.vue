<template>
	<section class="stack">
		<div id="explore" class="map" />
		<div v-if="activeTrail" class="map-pane">
			<h5>{{ activeTrail[`name__${locale}`] }}</h5>
			<p>{{ activeTrail[`description__${locale}`] }}</p>
			<ul class="profiles">
				<li v-for="profile in activeTrail.profile" :key="profile">
					<img :src="`/images/vectors/profiles/${profile}.svg`" alt="">
					{{ t(`explore.profiles.${profile}`) }}
				</li>
			</ul>
			<timeline :season="activeTrail.seasonality" :highlight="activeTrail.do_it_now" />
		</div>
	</section>
	<section data-tag-pre="trails">
		<ul
			v-dragscroll
			:data-empty="t('explore.trails.empty')"
			:class="['trails', 'scroller', { selected: activeTrail }]">
			<li
				v-for="trail in trails"
				:key="trail"
				@click="toggleTrail(trail)"
				:class="['card', { selected: activeTrail && trail.id === activeTrail.id }]">
				<figure class="cover faded">
					<img :src="trail.img[0].thumbnails.large.url">
				</figure>
				<h5>{{ trail[`name__${locale}`] }}</h5>
			</li>
		</ul>
	</section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMap, useGeoJSON, useAnimations } from '/@/components/map';
import airtable from '/@/apis/airtable';
import Timeline from '/@/components/Timeline.vue';
import config from '/@/config/views/explore.yaml';

const api = airtable(config.api.base);

export default {
	name: 'Explore',
	components: { Timeline },
	setup() {
		const { t, locale } = useI18n();

		const geojson = reactive({});
		const trails = ref([]);
		const activeTrail = ref(undefined);

		const toggleTrail = trail => {
			geojson.layers.removeLayer('trail');
			if (activeTrail.value && trail.id === activeTrail.value.id)
				return activeTrail.value = undefined;
			geojson.layers.addLayer(trail.track[0].url, {
				name: 'trail',
				className: 'explore-route',
				onLoad: geojson.animations.tracePath,
			});
			activeTrail.value = trail;
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

		return { t, locale, trails, activeTrail, toggleTrail };
	},
};
</script>
