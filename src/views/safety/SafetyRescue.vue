<template>
	<section class="stack block-image">
		<figure v-animate:fade-up class="attribution cover faded shadow-br">
			<img src="https://images.pexels.com/photos/263356/pexels-photo-263356.jpeg">
			<figcaption>© photo by pixabay on Pexels</figcaption>
		</figure>
		<section>
			<h2 v-animate:fade>{{ t('safety.rescue.emergency_phone') }}</h2>
			<div v-animate:fade-down class="box box--alert">
				<h1 class="emergency-phone">112</h1>
				<p>{{ t('safety.rescue.european_phone') }}</p>
				<p class="note">{{ t('safety.rescue.disclaimer') }}</p>
			</div>
		</section>
	</section>
	<section>
		<p v-animate:fade>{{ t('safety.rescue.phone_directives') }}</p>
		<ul class="grid-list grid-list--bignum">
			<li
				v-for="(question, i) in phoneQuestions"
				:key="question"
				v-animate:fade-up="`${0.25 + i * 0.25}s`">
				<h4>{{ t(`safety.rescue.phone_questions.${question}`) }}</h4>
				<p>{{ t(`safety.rescue.phone_questions.${question}_desc`) }}</p>
			</li>
		</ul>
	</section>
	<section v-animate:fade :data-tag="t('safety.rescue.distress_signals')">
		<div class="columns">
			<article class="column">
				<p v-animate:fade-up>
					{{ t('safety.rescue.distress.helicopter_message') }}
				</p>
				<div v-animate:fade-down class="columns">
					<figure class="column silhouette">
						<inline-svg src="/images/vectors/silhouettes/hands_up.svg" />
						<figcaption>{{ t('safety.rescue.distress.helicopter_yes') }}</figcaption>
					</figure>
					<figure class="column silhouette">
						<inline-svg src="/images/vectors/silhouettes/hand_up.svg" />
						<figcaption>{{ t('safety.rescue.distress.helicopter_no') }}</figcaption>
					</figure>
				</div>
			</article>
			<article class="column stack">
				<p v-animate:fade-up>
					{{ t('safety.rescue.distress.morse_sos') }}
				</p>
				<p v-animate:fade-down class="center sos">
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
import InlineSvg from 'vue-inline-svg';

export default {
	name: 'SafetyRescue',
	components: { InlineSvg },
	setup() {
		const { t } = useI18n();

		const phoneQuestions = ['what', 'when', 'where', 'who'];

		return { t, phoneQuestions };
	},
};
</script>
