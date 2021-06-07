<template>
	<div class="trail-sheet">
		<h3>{{ trail[`name__${locale}`] }}</h3>
		<p>{{ trail[`description__${locale}`] }}</p>
		<ul class="stats">
			<li v-for="(stat, name) in stats" :key="name">
				{{ format(stat.value) }}<small>{{ stat.unit }}</small>
				<em>{{ t(`explore.filters.${name}`) }}</em>
			</li>
		</ul>
		<timeline :season="trail.seasonality" :highlight="trail.do_it_now" />
	</div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Timeline from '/@/components/Timeline.vue';

export default {
	name: 'TrailSheet',
	components: { Timeline },
	props: { trail: { type: Object, required: true } },
	setup(props) {
		const { t, locale } = useI18n();

		const stats = computed(() => {
			const hours = Math.floor(props.trail.duration / 3600);
			const minutes = Math.floor(props.trail.duration / 60) % 60;
			return {
				distance: { value: props.trail.distance / 1000, unit: 'km' },
				duration: { value: `${hours}${minutes ? `:${minutes}` : ''}`, unit: 'h' },
				drop: {
					value: `+${props.trail.drop_positive} / -${props.trail.drop_negative}`,
					unit: 'm',
				},
			};
		});

		const format = value => {
			const options = { maximumFractionDigits: 1 };
			return typeof value === 'string'
				? value
				: new Intl.NumberFormat(locale.value, options).format(value);
		};

		return { t, locale, stats, format };
	},
};
</script>
