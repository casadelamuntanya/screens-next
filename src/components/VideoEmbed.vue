<template>
	<div class="video-player" :style="`padding-bottom:${height}%`">
		<iframe :src="url" allow="autoplay" />
	</div>
</template>

<script>
import { computed } from 'vue';
import { video } from '/@/config/media.yaml';

const useProvider = (provider, props, videoId) => {
	const providers = {
		// https://developers.google.com/youtube/player_parameters?hl=es-419
		youtube: (parameters, playlist) => {
			const { subs: hl, start, end, quality: vq } = parameters;
			return { ...video.youtube, playlist, hl, start, end, vq };
		},
		// https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters
		vimeo: ({ quality, subs: texttrack }) => ({ ...video.vimeo, quality, texttrack }),
		// https://developer.dailymotion.com/player/#player-parameters
		dailymotion: ({ subtitles }) => ({ ...video.dailymotion, 'subtitles-default': subtitles }),
	};
	return providers[provider](props, videoId);
};

export default {
	name: 'VideoEmbed',
	props: {
		// EMBED[!] url of the video
		src: { type: String, required: true },
		// ISO 639-2 code for subtitles language
		subs: { type: String, default: 'ca' },
		// Video aspect ratio. Default 16:9
		aspectRatio: { type: Number, default: 16 / 9 },
		// Seconds from the start to init reproduction (0 from the beginning)
		start: { type: Number, default: 0 },
		// Seconds from the start to stop reproduction (undefined till the end)
		end: { type: Number, default: undefined },
		quality: { type: String, default: 'medium' },
	},
	setup(props) {
		const height = computed(() => (1 / props.aspectRatio) * 100);
		const url = computed(() => {
			const [, provider, id] = props.src.match(/\.(.*)\.com(?:\/embed)?(?:\/video)?\/(.+)/);
			const parameters = useProvider(provider, props, id);
			return `${props.src}?${new URLSearchParams(parameters).toString()}`;
		});
		return { url, height };
	},
};
</script>

<style lang="scss" scoped>
.video-player {
	position: relative;
	overflow: hidden;
	pointer-events: none;

	iframe {
		position: absolute;
		height: 100%;
		width: 100%;
	}
}
</style>
