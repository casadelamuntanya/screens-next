<template>
	<div :class="classes">
		<figure class="cover faded">
			<img :src="trail.img[0].thumbnails.large.url">
		</figure>
		<h4>{{ trail[`name__${locale}`] }}</h4>
		<ul class="stats">
			<li v-for="(stat, name) in stats" :key="name">
				{{ format(stat.value) }}<small>{{ stat.unit }}</small>
				<em>{{ t(`explore.filters.${name}`) }}</em>
			</li>
		</ul>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'TrailCard',
	props: {
		trail: { type: Object, required: true },
		active: { type: Object, default: undefined },
	},
	setup(props) {
		const { t, locale } = useI18n();
		const classes = computed(() => {
			const active = props.active && props.active.id === props.trail.id;
			const inactive = props.active && !active;
			return ['card', { active, inactive }];
		});

		const stats = computed(() => {
			const hours = Math.floor(props.trail.duration / 3600);
			const minutes = Math.floor(props.trail.duration / 60) % 60;
			return {
				distance: { value: props.trail.distance / 1000, unit: 'km' },
				duration: { value: `${hours}${minutes ? `:${minutes}` : ''}`, unit: 'h' },
			};
		});

		const format = value => {
			const options = { maximumFractionDigits: 1 };
			return typeof value === 'string'
				? value
				: new Intl.NumberFormat(locale.value, options).format(value);
		};

		return { t, locale, classes, stats, format };
	},
};
</script>

<style lang="scss" scoped>
.card {
	transition: all 0.5s ease;
	height: 12rem;
	flex: 0 0 9rem;

	& + .card { margin-left: 2rem; }

	&.active {
		background: #fff;
		position: sticky;
		left: 1em;
		right: 1em;
		z-index: 10;
		box-shadow: 0 0 1.5em 2em #fff;
	}

	&.inactive {
		opacity: 0.2;
		filter: saturate(0.25);
		transform: scale(0.9);
	}

	.stats {
		position: absolute;
		bottom: 0;
		width: 100%;
		color: #fff;
		background: linear-gradient(to bottom, #0000 0%, #0008 100%);
		border-radius: var(--border-radius);
	}
}
</style>
