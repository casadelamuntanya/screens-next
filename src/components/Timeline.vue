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
