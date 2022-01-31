<template>
  <ul class="nav-locales">
    <li v-for="locale in supported" :key="locale">
      <button
        :class="{ 'is-active': isActive(locale) }"
        @click="setLocale(locale)">
        {{ locale }}
      </button>
    </li>
  </ul>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { setLocale } from '/@/i18n';
import { locales } from '/@/config/global.yaml';

export default {
  name: 'NavLocale',
  setup() {
    const { supported } = locales;
    const { locale: current } = useI18n();
    const isActive = locale => locale === current.value;
    return { supported, isActive, setLocale };
  },
};
</script>
