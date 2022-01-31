<template>
  <!-- Intro video -->
  <section v-animate:fade class="block-video" :data-tag="t('about.vision')">
    <h1 v-animate:fade-up>CASA DE LA MUNTANYA</h1>
    <video-embed
      v-animate:fade-down
      :src="video"
      :subs="locale"
      class="shadow-bl" />
    <p v-animate:fade-up>{{ t('about.our_vision') }}</p>
  </section>
  <!-- Floorplan -->
  <section v-animate:fade class="stack" :data-tag="t('about.floorplan')">
    <image-markers v-animate:fade-up :markers="markers" class="center">
      <img src="/images/vectors/floorplan.svg" width="650">
      <template #marker="{ marker }">
        <span :data-tooltip="t(`about.zones.${marker.id}`)">
          <i :class="`marker ${marker.icon}`" />
        </span>
      </template>
    </image-markers>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import VideoEmbed from '/@/components/VideoEmbed.vue';
import ImageMarkers from '/@/components/ImageMarkers.vue';
import { video, markers } from '/@/config/views/about.yaml';

export default {
  name: 'About',
  components: { VideoEmbed, ImageMarkers },
  setup() {
    const { t, locale } = useI18n();

    return { t, locale, video, markers };
  },
};
</script>
