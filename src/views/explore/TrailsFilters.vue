<template>
	<ul class="nav-bar">
		<li v-for="(_, name) in filters" :key="name">
			<label>
				<input v-model="filter" type="radio" :value="name">
				<span>{{ t(`explore.filters.${name}`) }}</span>
			</label>
		</li>
	</ul>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'TrailsFilters',
	props: { modelValue: { type: Function, default: () => true } },
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const { t } = useI18n();

		const filter = ref('all');
		const currentMonth = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();

		const filters = {
			all: () => true,
			trending: trail => trail.do_it_now?.includes(currentMonth),
		};

		watch(filter, name => {
			emit('update:modelValue', filters[name]);
		}, { immediate: true });

		return { t, filters, filter };
	},
};
</script>
