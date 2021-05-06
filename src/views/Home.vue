<template>
	<section class="fill" :data-tag="t('navigation.menu')">
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
	name: 'Home',
	setup() {
		const { t } = useI18n();
		return { t };
	},
};
</script>
