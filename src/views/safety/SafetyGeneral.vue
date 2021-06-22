<template>
	<section class="stack block-image image-thick">
		<figure class="attribution cover faded shadow-br" data-animate="fade-down">
			<img src="https://source.unsplash.com/HaHd7dG2YnA/900x1000">
			<figcaption>© photo by Hannah Tims on Unsplash</figcaption>
		</figure>
		<section data-animate="fade-up">
			<p>{{ t('safety.general.intro') }}</p>
			<p>{{ t('safety.general.guide') }}</p>
		</section>
	</section>
	<section :data-tag="t('safety.general.basic_principles')" data-animate="fade">
		<ul class="grid-list grid-list--2 grid-list--bignum">
			<li
				v-for="(principle, i) in principles"
				:key="principle"
				data-animate="fade-up"
				:data-animate-delay-in="`${0.25 + i * 0.25}s`">
				<h3>{{ t(`safety.general.principles.${principle}`) }}</h3>
				<p
					data-animate="fade-down"
					:data-animate-delay-in="`${0.25 + i * 0.25}s`">
					{{ t(`safety.general.principles.${principle}_desc`) }}
				</p>
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
