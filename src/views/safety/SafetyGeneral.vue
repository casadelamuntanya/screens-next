<template>
	<div class="grid fill">
		<section class="block-image">
			<figure class="shadow shadow--bottom shadow--right">
				<img src="https://source.unsplash.com/HaHd7dG2YnA/500x600">
				<figcaption>photo by Hannah Tims on Unsplash</figcaption>
			</figure>
			<div class="block-image__desc">
				<p>{{ t('safety.general.intro') }}</p>
				<p>{{ t('safety.general.guide') }}</p>
			</div>
		</section>
		<div class="row">
			<div class="col">
				<section :data-tag="t('safety.general.basic_principles')" class="fill center">
					<ul class="list list--grid list--bignum">
						<li v-for="principle in principles" :key="principle">
							<h3>{{ t(`safety.general.principles.${principle}`) }}</h3>
							<p>{{ t(`safety.general.principles.${principle}_desc`) }}</p>
						</li>
					</ul>
				</section>
			</div>
		</div>
	</div>
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
