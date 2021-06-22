<template>
	<section class="block-video">
		<h1 data-animate="fade-up">{{ t('safety.thunderstorm.thunderstorm') }}</h1>
		<video-embed :src="video" class="shadow-bl" data-animate="fade-down" />
		<p data-animate="fade-up">{{ t('safety.thunderstorm.description') }}</p>
	</section>

	<section class="stack columns">
		<div class="column column--2 stack" data-animate="fade-right">
			<p class="center">{{ t('safety.thunderstorm.know_distance') }}</p>
		</div>
		<div class="column stacks" data-animate="fade-left">
			<p class="text-xxxl">d<small>(km)</small> = s / 3</p>
		</div>
	</section>

	<section>
		<h2 data-animate="fade-up">
			{{ t('safety.thunderstorm.avoid_lightning') }}
		</h2>
		<p data-animate="fade-up" data-animate-delay-in="0.25s">
			{{ t('safety.thunderstorm.prevention') }}
		</p>
	</section>
	<section class="columns">
		<section
			class="column"
			:data-tag-pre="t('safety.thunderstorm.in_case_of')"
			data-animate="fade">
			<ul class="icon-list">
				<li
					v-for="(tip, i) in dos"
					:key="tip"
					data-animate="fade-left"
					:data-animate-delay-in="`${0.5 + i * 0.15}s`">
					<i class="ri-check-line icon icon--success" />
					{{ t(`safety.thunderstorm.safety_tips.${tip}`) }}
				</li>
				<li
					v-for="(tip, i) in donts"
					:key="tip"
					data-animate="fade-left"
					:data-animate-delay-in="`${0.5 + dos.length * 0.15 + i * 0.15}s`">
					<i class="ri-close-line icon icon--alert" />
					{{ t(`safety.thunderstorm.safety_tips.${tip}`) }}
				</li>
			</ul>
		</section>
		<section
			class="column"
			:data-tag-pre="t('safety.thunderstorm.safety_position')"
			data-animate="fade">
			<image-markers :markers="markers" class="center" data-animate="fade-up">
				<img src="/images/vectors/silhouettes/crouching.svg" width="350">
				<template #marker="{ marker }">
					<span :data-tooltip="t(`safety.thunderstorm.safety_tips.${marker.id}`)">
						<i class="marker ri-add-line" />
					</span>
				</template>
			</image-markers>
		</section>
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { thunderstorm } from '/@/config/views/safety.yaml';
import VideoEmbed from '/@/components/VideoEmbed.vue';
import ImageMarkers from '/@/components/ImageMarkers.vue';

export default {
	name: 'SafetyThunderstorm',
	components: { VideoEmbed, ImageMarkers },
	setup() {
		const { t } = useI18n();
		const { video, dos, donts, markers } = thunderstorm;
		return { t, video, dos, donts, markers };
	},
};
</script>
