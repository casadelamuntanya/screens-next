<template>
  <div class="center">
    <concept-tree :concepts="concepts" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import repository from './repository';
import ConceptTree from './components/ConceptTree.vue';

export default {
  name: 'Discover',
  components: { ConceptTree },
  setup() {
    const concepts = ref({});

    onMounted(async () => {
      concepts.value = await repository.getConcepts();
    });

    return { concepts };
  },
};
</script>
