<template>
  <component
    :is="mime"
    :src="media.url"
    autoplay
    loop />
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Media',
  props: {
    media: { type: Object, required: true },
    autoplay: { type: Boolean, default: false },
  },
  setup(props) {
    const mime = computed(() => (props.media.type.match(/video\//g) ? 'video' : 'img'));
    return { mime };
  },
};
</script>

<style lang="scss" scoped>
video,
img { object-fit: cover; }
</style>
