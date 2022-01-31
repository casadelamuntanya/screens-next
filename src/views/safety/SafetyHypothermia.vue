<template>
  <section class="hypothermia-animation stack block-image image-thin">
    <inline-svg
      v-animate:fade-left
      src="/images/vectors/silhouettes/body.svg"
      :style="gradient" />
    <section class="stack">
      <h1 v-animate:fade-right class="temperature">
        {{ temperature.toFixed(1) }} <small>&deg;C</small>
      </h1>
      <ul v-animate:fade-right class="symptoms">
        <li v-for="symptom in currentSymptoms" :key="symptom" :class="symptom">
          {{ t(`safety.hypothermia.symptoms.${symptom}`) }}
        </li>
      </ul>
      <p v-animate:fade-up>{{ t('safety.hypothermia.definition') }}</p>
    </section>
  </section>
  <section class="columns">
    <section
      v-animate:fade
      class="column"
      :data-tag-pre="t('safety.hypothermia.prevention_tips')">
      <ul class="icon-list">
        <li v-for="(tip, i) in prevention.dos" :key="tip" v-animate="routeAnimation(i)">
          <i class="ri-check-line icon icon--success" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
        <li
          v-for="(tip, i) in prevention.donts"
          :key="tip"
          v-animate="routeAnimation(i, prevention.dos.length * 0.15)">
          <i class="ri-close-line icon icon--alert" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
      </ul>
    </section>
    <section
      v-animate:fade
      class="column"
      :data-tag-pre="t('safety.hypothermia.in_case_of')">
      <ul class="icon-list">
        <li v-for="(tip, i) in treatment.dos" :key="tip" v-animate="routeAnimation(i)">
          <i class="ri-check-line icon icon--success" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
        <li
          v-for="(tip, i) in treatment.donts"
          :key="tip"
          v-animate="routeAnimation(i, treatment.dos.length * 0.15)">
          <i class="ri-close-line icon icon--alert" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';
import { hypothermia } from '/@/config/views/safety.yaml';

// Temperature animation
const useTemperature = options => {
  const { min, max, timeouts } = options;
  const temperature = ref(max);
  let isTemperatureFalling = true;

  watch(temperature, t => {
    isTemperatureFalling = t > min ? t < max ? isTemperatureFalling : true : false;
    const step = isTemperatureFalling ? -0.1 : 0.1;
    const timeout = t > min && t < max
      ? isTemperatureFalling ? timeouts.decrease : timeouts.increase
      : timeouts.wait;
    setTimeout(() => {
      temperature.value = Math.round((temperature.value + step) * 10) / 10;
    }, timeout);
  }, { immediate: true });

  return { temperature };
};

// Color gradient
const useColors = colors => {
  const constrain = (num, min, max) => Math.min(Math.max(num, min), max);
  const get = index => colors[constrain(index, 0, colors.length - 1)];
  return { get };
};

export default {
  name: 'SafetyHypothermia',
  components: { InlineSvg },
  setup() {
    const { t } = useI18n();
    const { animation, symptoms, treatment, prevention } = hypothermia;
    const { temperature } = useTemperature(animation);
    const colors = useColors(animation.colors);

    const gradient = computed(() => {
      const { max } = animation;
      const cold = colors.get((max - Math.ceil(temperature.value)) * 2);
      const warm = colors.get(max - Math.ceil(temperature.value));
      return { '--in-color': warm, '--out-color': cold };
    });

    const currentSymptoms = computed(() => Object.keys(symptoms).filter(symptom => {
      const [min, max] = symptoms[symptom];
      return temperature.value >= min && temperature.value <= max;
    }));

    const routeAnimation = (i, initialDelay = 0) => ({
      enter: {
        animation: 'fade-left',
        delay: `${initialDelay + i * 0.15}s`,
      },
      leave: 'fade-left',
    });

    return { t, gradient, temperature, currentSymptoms, prevention, treatment, routeAnimation };
  },
};
</script>

<style lang="scss" scoped>
.hypothermia-animation {

  section { margin-top: 0; }

  .symptoms {
    margin-bottom: auto;
    font-size: 1.5em;

    li { margin: 1.2em 2em; }
  }

  .temperature {
    font-size: 6rem;
    text-align: center;
    margin: 0.75em 0;
  }
}
</style>
