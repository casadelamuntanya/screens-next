<template>
  <div class="app">
    <header class="app__header">
      <router-link to="/" class="app__menu-link">
        <inline-svg src="/images/vectors/logo.svg" />
        <span v-if="!isMenu">{{ t('navigation.menu') }}</span>
      </router-link>
      <nav-locale />
    </header>
    <main class="stack">
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import InlineSvg from 'vue-inline-svg';
import NavLocale from '/@/layouts/NavLocale.vue';

export default {
  name: 'App',
  components: { InlineSvg, NavLocale },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const isMenu = computed(() => route.path === '/');
    return { t, isMenu };
  },
};
</script>
