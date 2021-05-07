<template>
	<!-- Intro video -->
	<section :data-tag="t('about.vision')">
		<h1>CASA DE LA MUNTANYA</h1>
		<video-embed :src="video" :subs="locale" />
		<p>{{ t('about.our_vision') }}</p>
	</section>
	<!-- Floorplan -->
	<section class="stack" :data-tag="t('about.floorplan')">
		<image-markers :markers="markers" class="center">
			<img src="/images/vectors/floorplan.svg" width="650">
			<template #marker="{ marker }">
				<span :data-tooltip="t(`about.zones.${marker.id}`)">
					<i :class="`marker ${marker.icon}`" />
				</span>
			</template>
		</image-markers>
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import VideoEmbed from '/@/components/VideoEmbed.vue';
import ImageMarkers from '/@/components/ImageMarkers.vue';
import { video, markers } from '/@/config/views/about.yaml';

export default {
	name: 'About',
	components: { VideoEmbed, ImageMarkers },
	setup() {
		const { t, locale } = useI18n();

		return { t, locale, video, markers };
	},
};
</script>
