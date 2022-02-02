<template>
  <section class="columns advanced-filters">
    <div class="column">
      <fieldset v-for="(options, name) in filters.ranges" :key="name" class="range">
        <legend>{{ t(`explore.filters.${name}`) }}</legend>
        <em>{{ rangeLabel(name) }}</em>
        <slider v-model="ranges[name]" v-bind="options" :tooltips="false" />
      </fieldset>
    </div>
    <div class="column">
      <fieldset v-for="(options, name) in filters.picks" :key="name" class="picker">
        <legend>{{ t(`explore.filters.${name}`) }}</legend>
        <label v-for="item in options" :key="item">
          <input v-model="picks[name]" :value="item" type="checkbox">
          {{ t(`explore.${name}.${item}`, item) }}
        </label>
      </fieldset>
    </div>
  </section>
</template>

<script>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Slider from '@vueform/slider';
import * as converter from 'units-converter';
import { filters } from '../config.yaml';

/* eslint-disable camelcase */
export default {
  name: 'TrailFiltersAdvanced',
  components: { Slider },
  props: { modelValue: { type: Function, required: true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const { distance, duration, drop_positive } = filters.ranges;
    const picks = reactive({ wildlife: [], culture: [], origin: [] });
    const ranges = reactive({
      distance: [distance.min, distance.max],
      duration: [duration.min, duration.max],
      drop_positive: [drop_positive.min, drop_positive.max],
    });

    const rangeLabel = name => {
      const { type, from, to } = filters.ranges[name].unit;
      const min = converter[type](ranges[name][0]).from(from).to(to).value;
      const max = converter[type](ranges[name][1]).from(from).to(to).value;
      return ranges[name][1] === filters.ranges[name].max
        ? t('explore.filters.range.more_than', { min, unit: to })
        : t('explore.filters.range.from_to', { min, max, unit: to });
    };

    watch([picks, ranges], () => {
      const filter = trail => {
        const inRanges = Object.entries(ranges).every(([attribute, range]) => {
          const max = range[1] === filters.ranges[attribute].max ? Infinity : range[1];
          return range[0] <= trail[attribute] && trail[attribute] <= max;
        });
        const hasPicks = Object.entries(picks).every(([attribute, pick]) => {
          const items = Array.isArray(pick) ? pick : [pick];
          return !items.length || items.some(item => trail[attribute]?.includes(item));
        });
        return inRanges && hasPicks;
      };
      emit('update:modelValue', filter);
    }, { immediate: true });

    return { t, picks, ranges, rangeLabel, filters };
  },
};
</script>

<style lang="scss" scoped>
.advanced-filters {
  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
}
</style>
