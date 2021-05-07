<template>
	<section class="stack block-image">
		<figure class="attribution cover shadow-br">
			<img src="https://source.unsplash.com/HaHd7dG2YnA/900x1000">
			<figcaption>photo by Hannah Tims on Unsplash</figcaption>
		</figure>
		<section>
			<p>{{ t('safety.general.intro') }}</p>
			<p>{{ t('safety.general.guide') }}</p>
		</section>
	</section>
	<section :data-tag="t('safety.general.basic_principles')">
		<ul class="grid-list grid-list--2 grid-list--bignum">
			<li v-for="principle in principles" :key="principle">
				<h3>{{ t(`safety.general.principles.${principle}`) }}</h3>
				<p>{{ t(`safety.general.principles.${principle}_desc`) }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { principles } from '/@/config/views/safety.yaml';

export default {
	name: 'SafetyGeneral',
	setup() {
		const { t } = useI18n();
		return { t, principles };
	},
};
</script>
