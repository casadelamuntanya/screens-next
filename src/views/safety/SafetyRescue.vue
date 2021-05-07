<template>
	<div id="safety-rescue" class="grid fill">
		<section class="block-image">
			<figure class="shadow shadow--right shadow--bottom">
				<img src="https://images.pexels.com/photos/263356/pexels-photo-263356.jpeg">
				<figcaption>photo by pixabay on Pexels</figcaption>
			</figure>
			<div class="block-image__desc">
				<h1>{{ t('safety.rescue.emergency_phone') }}</h1>
				<div class="box box--alert">
					<h1 class="emergency-phone">112</h1>
					<p>{{ t('safety.rescue.european_phone') }}</p>
					<p class="note">{{ t('safety.rescue.disclaimer') }}</p>
				</div>
			</div>
		</section>
		<div class="row row--tight">
			<div class="col">
				<section class="fill">
					<p>{{ t('safety.rescue.phone_directives') }}</p>
					<ul class="list list--bignum">
						<li v-for="question in phoneQuestions" :key="question">
							<h4>{{ t(`safety.rescue.phone_questions.${question}`) }}</h4>
							<p>{{ t(`safety.rescue.phone_questions.${question}_desc`) }}</p>
						</li>
					</ul>
				</section>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<section class="grid fill" :data-tag="t('safety.rescue.distress_signals')">
					<div class="row">
						<div class="col grid">
							<div class="row row--tight">
								<div class="col">
									<p>{{ t('safety.rescue.distress.helicopter_message') }}</p>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<figure class="fill">
										<img svg-inline src="/images/vectors/silhouettes/hands_up.svg">
									</figure>
								</div>
								<div class="col">
									<figure class="fill">
										<img svg-inline src="/images/vectors/silhouettes/hand_up.svg">
									</figure>
								</div>
							</div>
						</div>
						<div class="col">
							<p>{{ t('safety.rescue.distress.morse_sos') }}</p>
							<p class="distress__sos">
								<span data-morse-beep="S">S</span>
								<span data-morse-beep="O">O</span>
								<span data-morse-beep="S">S</span>
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
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
