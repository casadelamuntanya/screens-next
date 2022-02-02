<template>
  <div class="center">
    <ul :class="['tree', { contracted }]">
      <li
        :key="concept.id"
        :class="['tree__root', { single: !concept.children.length }]"
        @click="back">
        <div class="concept">
          <div class="concept__card">
            <figure v-if="concept.media" class="cover attribution faded">
              <img :src="concept.media[0].url" :alt="concept.name">
              <figcaption>{{ concept.media[0].filename }}</figcaption>
            </figure>
            <hgroup>
              <h4 class="concept__subtitle">{{ concept.complement }}</h4>
              <h3 class="concept__title">{{ concept[`name_${locale}`] }}</h3>
            </hgroup>
            <img
              v-if="concept[`outer_qr_${locale}`]"
              :src="concept[`outer_qr_${locale}`][0].url"
              class="concept__qr">
          </div>
          <p>{{ concept[`description_${locale}`] }}</p>
        </div>
      </li>
      <li
        v-for="(child, i) in concept.children"
        :key="child.id"
        :style="position(i)"
        class="tree__leaf"
        @click="selectConcept(child, $event)">
        <div class="concept">
          <div class="concept__card">
            <figure v-if="child.media" class="cover attribution faded">
              <img :src="child.media[0].url" :alt="child.name">
              <figcaption>{{ child.media[0].filename }}</figcaption>
            </figure>
            <hgroup>
              <h4 class="concept__title">{{ child[`name_${locale}`] }}</h4>
            </hgroup>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import repository from './repository';

export default {
  name: 'Discover',
  setup() {
    const { locale } = useI18n();

    const ELLIPSE_HEIGHT = window.innerHeight / 4;
    const ELLIPSE_WIDTH = window.innerWidth / 3;
    const concepts = ref({});
    const path = ref([]);
    const contracted = ref(false);

    const root = computed(() => Object.values(concepts.value).filter(({ parent }) => !parent));

    const concept = computed(() => {
      const [current] = path.value.slice(-1);
      const { _children = [], ...rest } = current || {};
      const children = current
        ? _children.map(child => concepts.value[child]).filter(Boolean)
        : root.value;
      return { ...rest, children };
    });

    const position = i => {
      const angle = i * ((2 * Math.PI) / concept.value.children.length);
      const radius = (ELLIPSE_HEIGHT * ELLIPSE_WIDTH) / Math.sqrt(
        ((ELLIPSE_HEIGHT * Math.cos(angle)) ** 2)
        + ((ELLIPSE_WIDTH * Math.sin(angle)) ** 2),
      );
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return `--angle:${angle}; --radius:${radius};--left:${x};--top:${y}`;
    };

    const selectConcept = (item, { currentTarget }) => {
      contracted.value = true;
      currentTarget.classList.add('active');
      currentTarget.addEventListener('transitionend', () => {
        path.value.push(item);
        contracted.value = false;
      }, { once: true });
    };

    const back = ({ currentTarget }) => {
      contracted.value = true;
      const trigger = currentTarget.nextElementSibling || currentTarget;
      trigger.addEventListener('transitionend', () => {
        path.value.pop();
        contracted.value = false;
      }, { once: true });
    };

    onMounted(async () => {
      concepts.value = await repository.getConcepts();
    });

    return { locale, concept, contracted, position, selectConcept, back };
  },
};
</script>

<style lang="scss" scoped>
.tree {
  --duration: 0.75s;
  --scale-s: 0.25;
  --scale-m: 0.5;

  position: relative;

  .concept {
    position: absolute;
    transform: translate(-50%, -50%);

    &__card {
      position: relative;
      transition: all var(--duration) ease;
      width: 35rem;
      height: 40rem;

      figure {
        height: 100%;
        width: 100%;
        border-radius: 0.5rem;
        overflow: hidden;
        margin: 0;
      }
    }

    hgroup {
      position: absolute;
      bottom: 100%;
      margin: -2rem;
    }

    &__title {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 4rem;
      margin: 0;
    }

    &__subtitle {
      opacity: 0.4;
    }

    &__qr {
      height: 6rem;
      width: 5rem;
      position: absolute;
      top: 0;
      right: 0;
      margin: -2rem -1.5rem;
    }
  }

  &__leaf {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    transition: all var(--duration) ease;
    transform:
      translate(calc(1px * var(--left)), calc(1px * var(--top)))
      scale(var(--scale-s));
    animation: expand var(--duration) ease;

    &::before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      width: calc(1px * var(--radius));
      border-top: 1px dashed #d0d0d0;
      transform-origin: right center;
      transform:
        rotate(calc(1rad * var(--angle)))
        scale(calc(1 / var(--scale-s)));
      transition: inherit;
      animation: growline var(--duration) ease;
    }

    .contracted & {
      transform:
        translate(0, 0)
        scale(var(--scale-m)) !important;
      &::before { width: 0; }
    }
  }

  &__root {
    position: relative;
    z-index: 1;
    transform: scale(var(--scale-m));
    transition: all var(--duration) ease;

    &.single {
      transform: scale(1);
      animation: expand var(--duration) ease;
    }
  }

  &.contracted .single,
  &__leaf.active {
    transform: scale(var(--scale-m));
    z-index: 2;
  }
}

@keyframes expand {
  from {
    transform:
      translate(0, 0)
      scale(var(--scale-m));
  }
}

@keyframes growline {
  from { width: 0; }
}

</style>
