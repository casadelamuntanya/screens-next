<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown" v-html="markdown" />
</template>

<script>
import { computed } from 'vue';
import { Remarkable } from 'remarkable';

const remarkable = new Remarkable('full', {
  html: true,
  breaks: true,
  typographer: true,
});

export default {
  name: 'Markdown',
  setup(props, { slots }) {
    const markdown = computed(() => {
      const source = slots?.default()
        .filter(slot => !slot.el)
        .reduce((acc, { children, text = children }) => `${acc}\n${text?.trim()}`, '');
      return remarkable.render(source);
    });
    return { markdown };
  },
};
</script>
