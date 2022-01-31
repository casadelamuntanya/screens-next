<template>
  <div class="trails-filters">
    <ul v-bind="$attrs" class="nav-bar">
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
    <section v-if="filter === 'advanced'" class="columns advanced-filters">
      <div class="column">
        <fieldset
          v-for="(options, name) in { distance, duration, drop_positive }"
          :key="name"
          class="range">
          <legend>{{ t(`explore.filters.${name}`) }}</legend>
          <em>{{ rangeLabel(name) }}</em>
          <slider v-model="ranges[name]" v-bind="options" :tooltips="false" />
        </fieldset>
      </div>
      <div class="column">
        <fieldset
          v-for="(options, name) in { origin, culture, wildlife }"
          :key="name"
          class="picker">
          <legend>{{ t(`explore.filters.${name}`) }}</legend>
          <label v-for="item in options" :key="item">
            <input v-model="picks[name]" :value="item" type="checkbox">
            {{ t(`explore.${name}.${item}`, item) }}
          </label>
        </fieldset>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';
import Slider from '@vueform/slider';
import * as converter from 'units-converter';
import config from '../config.yaml';

// Helpers
const has = (array, item) => (Array.isArray(item)
  ? !item.length || item.some(child => array?.includes(child))
  : !item || array?.includes(item));

/* eslint-disable camelcase */
export default {
  name: 'TrailsFilters',
  components: { InlineSvg, Slider },
  props: { modelValue: { type: Function, default: () => true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const filter = ref('all');
    const currentMonth = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();
    const { profiles, origin, wildlife, culture } = config.filters;
    const profile = ref(undefined);
    const picks = reactive({ wildlife: [], culture: [], origin: [] });
    const { distance, duration, drop_positive } = config.filters;
    const ranges = reactive({
      distance: [distance.min, distance.max],
      duration: [duration.min, duration.max],
      drop_positive: [drop_positive.min, drop_positive.max],
    });

    const filters = {
      all: () => true,
      trending: trail => trail.do_it_now?.includes(currentMonth),
      featured: trail => !profile.value || trail.profile?.includes(profile.value),
      advanced: trail => {
        const inRanges = Object.entries(ranges).every(([attr, range]) => {
          const max = range[1] === config.filters[attr].max ? Infinity : range[1];
          return range[0] <= trail[attr] && trail[attr] <= max;
        });
        const hasPicks = Object.entries(picks).every(([attr, el]) => has(trail[attr], el));
        return inRanges && hasPicks;
      },
    };

    const rangeLabel = name => {
      const { type, from, to } = config.filters[name].unit;
      const min = converter[type](ranges[name][0]).from(from).to(to).value;
      const max = converter[type](ranges[name][1]).from(from).to(to).value;
      return ranges[name][1] === config.filters[name].max
        ? t('explore.filters.range.more_than', { min, unit: to })
        : t('explore.filters.range.from_to', { min, max, unit: to });
    };

    watch(filter, name => {
      profile.value = undefined;
      emit('update:modelValue', filters[name]);
    }, { immediate: true });

    return {
      t,
      filters,
      filter,
      profiles,
      distance,
      duration,
      drop_positive,
      origin,
      wildlife,
      culture,
      profile,
      picks,
      ranges,
      rangeLabel,
    };
  },
};
</script>

<style lang="scss" scoped>
.profiles {
  display: flex;
  justify-content: center;
  font-size: var(--s);

  li {
    text-align: center;
    margin: var(--s);
  }

  svg,
  img {
    display: block;
    margin: 0 auto var(--xs);
    height: var(--xxxl);
  }

  input {
    display: none;

    &:checked ~ * { color: var(--color-primary); }
  }
}

.advanced-filters {
  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
