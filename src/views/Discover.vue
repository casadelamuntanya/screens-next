<template>
	<div class="center">
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import airtable from '/@/apis/airtable';

export default {
	setup() {
		const concepts = ref({});
		onMounted(async () => {
			concepts.value = await airtable.getConcepts();
		});

		return {};
	},
};
</script>
