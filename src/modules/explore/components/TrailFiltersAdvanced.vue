<template>
  <section class="advanced-filters">
    <div class="columns">
      <div class="column">
        <fieldset v-for="(options, name) in RANGES" :key="name" class="range">
          <legend>{{ t(`explore.filters.${name}`) }}</legend>
          <em>{{ rangeLabel(name) }}</em>
          <slider v-model="ranges[name]" v-bind="options" :tooltips="false" />
        </fieldset>
      </div>
      <div class="column">
        <fieldset v-for="(options, name) in PICKS" :key="name" class="picker">
          <legend>{{ t(`explore.filters.${name}`) }}</legend>
          <label v-for="item in options" :key="item">
            <input v-model="picks[name]" :value="item" type="checkbox">
            {{ t(`explore.${name}.${item}`, item) }}
          </label>
        </fieldset>
      </div>
    </div>
    <p class="buttons">
      <button class="btn" @click="reset">{{ t('explore.clear_filters') }}</button>
    </p>
  </section>
</template>

<script>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Slider from '@vueform/slider';
import * as converter from 'units-converter';
import config from '../config.yaml';

const { ranges: RANGES, picks: PICKS } = config.filters;

const DEFAULT = {
  picks: { wildlife: [], culture: [], origin: [] },
  ranges: {
    distance: [RANGES.distance.min, RANGES.distance.max],
    duration: [RANGES.duration.min, RANGES.duration.max],
    drop_positive: [RANGES.drop_positive.min, RANGES.drop_positive.max],
  },
};

/* eslint-disable camelcase */
export default {
  name: 'TrailFiltersAdvanced',
  components: { Slider },
  props: { modelValue: { type: Function, required: true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const picks = reactive({ ...DEFAULT.picks });
    const ranges = reactive({ ...DEFAULT.ranges });

    const rangeLabel = name => {
      const { type, from, to } = RANGES[name].unit;
      const min = converter[type](ranges[name][0]).from(from).to(to).value;
      const max = converter[type](ranges[name][1]).from(from).to(to).value;
      return ranges[name][1] === RANGES[name].max
        ? t('explore.filters.range.more_than', { min, unit: to })
        : t('explore.filters.range.from_to', { min, max, unit: to });
    };

    const reset = () => {
      Object.assign(picks, DEFAULT.picks);
      Object.assign(ranges, DEFAULT.ranges);
    };

    watch([picks, ranges], () => {
      const filter = trail => {
        const inRanges = Object.entries(ranges).every(([attribute, range]) => {
          const max = range[1] === RANGES[attribute].max ? Infinity : range[1];
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

    return { t, RANGES, PICKS, ranges, picks, rangeLabel, reset };
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
