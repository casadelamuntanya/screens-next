<template>
  <ul class="nav-bar">
    <li v-for="route in routes" :key="route.name">
      <router-link :to="{ name: route.name }">
        {{ t(`safety.pages.${route.name}`) }}
      </router-link>
    </li>
  </ul>
  <router-view />
</template>

<script>
import { useI18n } from 'vue-i18n';
import routes from './routes';

export default {
  name: 'Safety',
  setup() {
    const { t } = useI18n();
    return { t, routes };
  },
};
</script>
