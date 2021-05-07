<template>
	<section class="stack block-image">
		<figure class="attribution cover faded shadow-br">
			<img src="https://images.pexels.com/photos/263356/pexels-photo-263356.jpeg">
			<figcaption>photo by pixabay on Pexels</figcaption>
		</figure>
		<section>
			<h2>{{ t('safety.rescue.emergency_phone') }}</h2>
			<div class="box box--alert">
				<h1 class="emergency-phone">112</h1>
				<p>{{ t('safety.rescue.european_phone') }}</p>
				<p class="note">{{ t('safety.rescue.disclaimer') }}</p>
			</div>
		</section>
	</section>
	<section>
		<p>{{ t('safety.rescue.phone_directives') }}</p>
		<ul class="grid-list grid-list--bignum">
			<li v-for="question in phoneQuestions" :key="question">
				<h4>{{ t(`safety.rescue.phone_questions.${question}`) }}</h4>
				<p>{{ t(`safety.rescue.phone_questions.${question}_desc`) }}</p>
			</li>
		</ul>
	</section>
	<section :data-tag="t('safety.rescue.distress_signals')">
		<div class="columns">
			<article class="column">
				<p>{{ t('safety.rescue.distress.helicopter_message') }}</p>
				<div class="columns">
					<figure class="column silhouette">
						<img v-svg-inline src="/images/vectors/silhouettes/hands_up.svg">
						<figcaption>{{ t('safety.rescue.distress.helicopter_yes') }}</figcaption>
					</figure>
					<figure class="column silhouette">
						<img v-svg-inline src="/images/vectors/silhouettes/hand_up.svg">
						<figcaption>{{ t('safety.rescue.distress.helicopter_no') }}</figcaption>
					</figure>
				</div>
			</article>
			<article class="column stack">
				<p>{{ t('safety.rescue.distress.morse_sos') }}</p>
				<p class="center sos">
					<span data-morse-beep="S">S</span>
					<span data-morse-beep="O">O</span>
					<span data-morse-beep="S">S</span>
				</p>
			</article>
		</div>
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
	name: 'SafetyRescue',
	setup() {
		const { t } = useI18n();

		const phoneQuestions = ['what', 'when', 'where', 'who'];

		return { t, phoneQuestions };
	},
};
</script>
