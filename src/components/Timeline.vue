<template>
	<ul class="timeline">
		<li v-for="month in timeline" :key="month.name" :class="month.class">
			{{ month.name }}
		</li>
	</ul>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export default {
	name: 'Timeline',
	props: {
		season: { type: Array, default: () => [] },
		highlight: { type: Array, default: () => [] },
	},
	setup(props) {
		const { t } = useI18n();
		const timeline = computed(() => MONTHS.map(month => ({
			name: t(`months.${month}`),
			class: {
				active: props.season.includes(month),
				highlight: props.highlight.includes(month),
			},
		})));

		return { timeline };
	},
};
</script>

<style lang="scss" scoped>
.timeline {
	display: inline-flex;
	font-size: var(--xs);
	margin: 1rem 0;

	li {
		flex: 1;
		position: relative;
		color: #0008;
		padding: var(--xs);
		background: #0001;

		&.active {
			background: var(--color-primary);
			color: #fff;
			font-weight: bold;
		}

		&.highlight::before {
			content: '';
			background: var(--color-primary);
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
			transform: scale(1, 2);
			opacity: 0.5;
			z-index: -1;
		}

		&:first-child {
			border-top-left-radius: var(--border-radius);
			border-bottom-left-radius: var(--border-radius);
		}

		&:last-child {
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
		}
	}
}
</style>
