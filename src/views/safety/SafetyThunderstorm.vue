<template>
	<section class="block-video">
		<h1>{{ t('safety.thunderstorm.thunderstorm') }}</h1>
		<video-embed :src="video" class="shadow-bl" />
		<p>{{ t('safety.thunderstorm.description') }}</p>
	</section>

	<section class="stack columns">
		<div class="column column--2 stack">
			<p class="center">{{ t('safety.thunderstorm.know_distance') }}</p>
		</div>
		<div class="column stacks">
			<p class="text-xxxl">d<small>(km)</small> = s / 3</p>
		</div>
	</section>

	<section>
		<h2>{{ t('safety.thunderstorm.avoid_lightning') }}</h2>
		<p>{{ t('safety.thunderstorm.prevention') }}</p>
	</section>
	<section class="columns">
		<section class="column" :data-tag-pre="t('safety.thunderstorm.in_case_of')">
			<ul class="icon-list">
				<li v-for="tip in dos" :key="tip">
					<i class="ri-check-line icon icon--success" />
					{{ t(`safety.thunderstorm.safety_tips.${tip}`) }}
				</li>
				<li v-for="tip in donts" :key="tip">
					<i class="ri-close-line icon icon--alert" />
					{{ t(`safety.thunderstorm.safety_tips.${tip}`) }}
				</li>
			</ul>
		</section>
		<section class="column" :data-tag-pre="t('safety.thunderstorm.safety_position')">
			<image-markers :markers="markers" class="center">
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
