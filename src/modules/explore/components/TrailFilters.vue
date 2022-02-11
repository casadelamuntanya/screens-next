<template>
  <div class="trails-filters">
    <ul v-bind="$attrs" class="nav-bar">
      <li v-for="(_, name) in filters" :key="name">
        <label>
          <input v-model="selected" type="radio" :value="name">
          <span>{{ t(`explore.filters.${name}`) }}</span>
        </label>
      </li>
    </ul>
    <trail-filters-profile
      v-if="selected === 'featured'"
      v-model="filters.featured" />
    <trail-filters-advanced
      v-if="selected === 'advanced'"
      v-model="filters.advanced" />
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import TrailFiltersProfile from './TrailFiltersProfile.vue';
import TrailFiltersAdvanced from './TrailFiltersAdvanced.vue';

export default {
  name: 'TrailsFilters',
  components: { TrailFiltersProfile, TrailFiltersAdvanced },
  props: { modelValue: { type: Function, default: () => true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const currentMonth = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();
    const selected = ref('all');
    const filters = reactive({
      all: () => true, // Display all trails
      trending: trail => trail.do_it_now?.includes(currentMonth), // Display trails that are trending this month
      featured: () => true, // Display trails that are featured for a specific profile
      advanced: () => true, // Display trails that match the advanced filters
    });

    watch([selected, filters], () => {
      emit('update:modelValue', filters[selected.value]);
    }, { immediate: true });

    return { t, filters, selected };
  },
};
</script>
