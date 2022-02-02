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
    <trail-elevation :trail="trail" />
    <timeline :season="trail.seasonality" :highlight="trail.do_it_now" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Timeline from './Timeline.vue';
import TrailElevation from './TrailElevation.vue';

export default {
  name: 'TrailSheet',
  components: { Timeline, TrailElevation },
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

<style lang="scss" scoped>
.trail-sheet {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 53%;
  margin: var(--m);
  z-index: 500;
  background: #fffa;
  padding: var(--l) var(--xxl);
  border-radius: var(--border-radius);
  font-size: var(--m);

  .stats {
    box-sizing: border-box;
    padding: var(--s);
    font-size: var(--l);
    display: flex;
    justify-content: space-around;

    em {
      display: block;
      font-size: var(--s);
    }
  }
}
</style>
