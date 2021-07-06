<template>
	<trails-filters v-model="filter" v-animate:fade />
	<section v-animate:fade :data-tag-pre="t('explore.trails')">
		<div
			v-dragscroll
			v-animate:fade-up
			class="trails scroller"
			:data-empty="t('explore.no_trails')">
			<trail-card
				v-for="trail in filteredTrails"
				:key="trail.id"
				:trail="trail"
				:active="activeTrail"
				@click="toggleTrail(trail)" />
		</div>
	</section>
	<section class="stack">
		<div id="explore" v-animate:fade class="map">
			<trail-sheet v-if="activeTrail" :trail="activeTrail" />
		</div>
	</section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMap, useGeoJSON, useAnimations } from '/@/components/map';
import airtable from '/@/apis/airtable';
import TrailCard from './explore/TrailCard.vue';
import TrailSheet from './explore/TrailSheet.vue';
import TrailsFilters from './explore/TrailsFilters.vue';
import config from '/@/config/views/explore.yaml';

export default {
	name: 'Explore',
	components: { TrailCard, TrailSheet, TrailsFilters },
	setup() {
		const { t, locale } = useI18n();

		const geojson = reactive({});
		const trails = ref([]);
		const filter = ref(undefined);
		const activeTrail = ref(undefined);

		const filteredTrails = computed(() => trails.value.filter(filter.value || Boolean));

		const toggleTrail = async trail => {
			geojson.layers.removeLayer('trail');
			if (activeTrail.value && trail.id === activeTrail.value.id) {
				activeTrail.value = undefined;
				return;
			}
			const track = await (await fetch(trail.track[0].url)).json();
			geojson.layers.addLayer(track, {
				name: 'trail',
				className: 'route',
				onLoad: geojson.animations.tracePath,
			});
			activeTrail.value = { ...trail, track };
		};

		onMounted(async () => {
			const map = useMap('explore', config.map);

			geojson.layers = useGeoJSON(map);
			geojson.animations = useAnimations(map);

			trails.value = await airtable.getExploreTrails();
		});

		return { t, locale, filteredTrails, activeTrail, toggleTrail, filter };
	},
};
</script>

<style lang="scss" scoped>
.trails { min-height: 13rem; }

.stats {
	box-sizing: border-box;
	padding: var(--s);
	font-size: var(--l);
	display: flex;
	justify-content: space-around;

	em {
		display: block;
		font-size: var(--s);
	}
}
</style>
