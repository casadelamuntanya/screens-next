<template>
  <div class="app" @click="resetTimeout">
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
import { useRoute, useRouter } from 'vue-router';
import InlineSvg from 'vue-inline-svg';
import NavLocale from '/@/components/NavLocale.vue';
import config from '/@/config.yaml';

export default {
  name: 'App',
  components: { InlineSvg, NavLocale },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const isMenu = computed(() => route.path === '/');

    let timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        router.push('/');
      }, config.timeout);
    };

    return { t, isMenu, resetTimeout };
  },
};
</script>
