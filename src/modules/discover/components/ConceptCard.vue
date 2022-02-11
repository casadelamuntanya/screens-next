<template>
  <div :class="['concept', { expanded, unique }]">
    <div class="card">
      <figure v-if="concept.media" class="cover attribution faded">
        <media :media="concept.media[selectedMedia]" />
        <figcaption>{{ concept.media[selectedMedia].filename }}</figcaption>
      </figure>
      <h4 class="title">
        <small v-if="expanded">{{ concept.complement }}</small>
        {{ concept[`name_${locale}`] }}
      </h4>
    </div>
    <ul v-if="expanded && unique && concept.media?.length > 1" class="gallery">
      <li v-for="(media, i) in concept.media" :key="media.filename" @click="selectMedia(i)">
        <media :media="media" class="faded" />
      </li>
    </ul>
    <div v-if="expanded" class="content">
      <markdown>{{ concept[`description_${locale}`] }}</markdown>
      <img
        v-if="concept[`outer_qr_${locale}`]"
        :src="concept[`outer_qr_${locale}`][0].url"
        class="qr">
    </div>
    <div v-if="expanded && concept.media" class="close" @click="close">
      {{ t('explore.go_back') }}
      <img src="../assets/reset.svg">
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Markdown from '/@/components/Markdown.vue';
import Media from './Media.vue';

export default {
  name: 'Concept',
  components: { Markdown, Media },
  props: {
    concept: { type: Object, required: true },
    expanded: { type: Boolean, default: false },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const selectedMedia = ref(0);
    const unique = computed(() => !props.concept.children?.length);

    const close = () => emit('close');

    const selectMedia = index => {
      selectedMedia.value = index;
    };

    return { t, locale, selectedMedia, unique, selectMedia, close };
  },
};
</script>

<style lang="scss" scoped>
.concept {
  position: absolute;
  transform: translate(-50%, -50%);

  .card {
    position: relative;
    width: 35rem;
    aspect-ratio: 1 / 1.1;

    h4 { width: 100%; }
  }

  header {
    position: absolute;
    bottom: 100%;
    margin: -2rem;
  }

  .content {
    display: flex;
    margin: 0.5rem 0;
  }

  .title {
    top: unset;
    bottom: 100%;
    margin: -0.5em;
    font-size: 4rem;

    small {
      opacity: 0.4;
      font-size: 0.4em;
      display: block;
      margin-bottom: 0.5em;
    }
  }

  .qr {
    height: 6rem;
    width: 6rem;
    margin: 0.5rem 0 0 1rem;
  }

  .close {
    position: absolute;
    top: 0%;
    right: 0%;
    transform: translate(50%, -50%);
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;

    img {
      display: block;
      height: 5rem;
      margin: 0 auto;
      transform: rotate(90deg);
    }
  }

  &.unique {
    .close {
      top: 0;
      right: 0;
      font-size: 1rem;

      img { height: 3rem; }
    }
  }

  .gallery {
    margin: 1rem 0;
    display: flex;
    gap: 0.5rem;
    justify-content: center;

    video,
    img {
      height: 5rem;
      aspect-ratio: 1 / 1.1;
      border-radius: 0.25rem;
    }
  }
}
</style>
