<template>
  <ul class="tree" :class="{ collapsed: isCollapsed }" :style="`--duration:${DURATION}`">
    <li :key="concept.id">
      <div class="wrapper">
        <concept-card
          v-if="concept.media"
          :concept="concept"
          expanded
          @close="unselect" />
        <div v-else class="root">
          <h2>{{ t('discover.title') }}</h2>
          <p>{{ t('discover.instructions') }}</p>
        </div>
      </div>
    </li>
    <li
      v-for="(child, i) in concept.children"
      :key="child.id"
      :style="leafPosition(i)">
      <div class="wrapper">
        <concept-card :concept="child" @click="select(child)" />
      </div>
    </li>
  </ul>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ConceptCard from './ConceptCard.vue';

export default {
  name: 'ConceptsTree',
  components: { ConceptCard },
  props: { concepts: { type: Object, required: true } },
  setup(props) {
    const HEIGHT = window.innerHeight / 4;
    const WIDTH = window.innerWidth / 3;
    const DURATION = 1000;

    const { t } = useI18n();
    const path = ref([]);
    const isCollapsed = ref(false);
    const root = computed(() => Object.values(props.concepts).filter(c => !c.parent));

    const concept = computed(() => {
      const [current] = path.value.slice(-1);
      const { _children = [], ...rest } = current || {};
      const children = current
        ? _children.map(child => props.concepts[child]).filter(Boolean)
        : root.value;
      return { ...rest, children };
    });

    const select = item => {
      isCollapsed.value = true;
      setTimeout(() => {
        path.value.push(item);
        isCollapsed.value = false;
      }, DURATION);
    };

    const unselect = () => {
      isCollapsed.value = true;
      setTimeout(() => {
        path.value.pop();
        isCollapsed.value = false;
      }, DURATION);
    };

    const leafPosition = i => {
      const angle = i * ((2 * Math.PI) / concept.value.children.length);
      const radius = (HEIGHT * WIDTH) / Math.sqrt(
        ((HEIGHT * Math.cos(angle)) ** 2) + ((WIDTH * Math.sin(angle)) ** 2),
      );
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return `--angle:${angle}; --radius:${radius};--left:${x};--top:${y};`;
    };

    return { t, DURATION, concept, isCollapsed, select, unselect, leafPosition };
  },
};
</script>

<style lang="scss" scoped>
.tree {
  --scale-s: 0.3;
  --scale-m: 0.5;

  position: relative;

  .root {
    width: 300px;
    transform: translate(-100%, -100%) scale(2);
  }

  li {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    transform: translate(calc(1px * var(--left)), calc(1px * var(--top)));
    transition: all calc(1ms * var(--duration)) ease;
    animation: expand calc(1ms * var(--duration)) ease;

    .wrapper{
      transform: scale(0.3);
      transition: all calc(1ms * var(--duration)) ease;
      animation: grow calc(1ms * var(--duration)) ease;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      border: 2px dashed #0001;
      width: calc(1px * var(--radius));
      transform-origin: right center;
      transform: rotate(calc(1rad * var(--angle)));
      transition: inherit;
      animation: growLine calc(1ms * var(--duration)) ease;
    }

    &:first-child {
      z-index: 1;
      .wrapper { transform: scale(var(--scale-m)); }
    }

    &:only-child .wrapper { transform:scale(1); }
  }

  &.collapsed li {
    transform: translate(0, 0);

    &::before { width: 0; }
    .wrapper { transform: scale(var(--scale-m)); }
  }
}

@keyframes expand {
  from { transform: translate(0, 0); }
}

@keyframes grow {
  from { transform: scale(var(--scale-m)); }
}

@keyframes growLine {
  from { width: 0; }
}
</style>
