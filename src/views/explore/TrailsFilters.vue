<template>
	<ul class="nav-bar">
		<li v-for="(_, name) in filters" :key="name">
			<label>
				<input v-model="filter" type="radio" :value="name">
				<span>{{ t(`explore.filters.${name}`) }}</span>
			</label>
		</li>
	</ul>
	<ul v-if="filter === 'featured'" class="profiles">
		<li v-for="name in profiles" :key="name">
			<label>
				<input v-model="profile" :value="name" type="radio">
				<inline-svg :src="`/images/vectors/profiles/${name}.svg`" />
				<span>{{ t(`explore.profiles.${name}`, name) }}</span>
			</label>
		</li>
	</ul>
	<section v-if="filter === 'advanced'" class="columns">
		<div class="column">
		</div>
		<div class="column">
			<fieldset v-for="(options, name) in { culture, wildlife }" :key="name" class="picker">
				<legend>{{ t(`explore.filters.${name}`) }}</legend>
				<label v-for="item in options" :key="item">
					<input v-model="picks[name]" :value="item" type="checkbox">
					<p>{{ t(`explore.${name}.${item}`, item) }}</p>
				</label>
			</fieldset>
		</div>
	</section>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';
import config from '/@/config/views/explore.yaml';

// Helpers
const has = (array, item) => (Array.isArray(item)
	? !item.length || item.some(child => array?.includes(child))
	: !item || array?.includes(item));

export default {
	name: 'TrailsFilters',
	components: { InlineSvg },
	props: { modelValue: { type: Function, default: () => true } },
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const { t } = useI18n();

		const filter = ref('all');
		const currentMonth = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();
		const { profiles, wildlife, culture } = config.filters;
		const profile = ref(undefined);
		const picks = reactive({ wildlife: [], culture: [] });

		const filters = {
			all: () => true,
			trending: trail => trail.do_it_now?.includes(currentMonth),
			featured: trail => !profile.value || trail.profile?.includes(profile.value),
			advanced: trail => {
				const hasPicks = Object.entries(picks).every(([attr, el]) => has(trail[attr], el));
				return hasPicks;
			},
		};

		watch(filter, name => {
			profile.value = undefined;
			emit('update:modelValue', filters[name]);
		}, { immediate: true });

		return { t, filters, filter, profiles, wildlife, culture, profile, picks };
	},
};
</script>
