<template>
	<section class="stack">
		<div class="drawer stack">
			<canvas ref="canvas" v-on="drawer.handlers" />
			<img :src="image">
		</div>
	</section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
export default {
	name: 'PlaygroundFingerpaint',
	setup() {
		const canvas = ref(null);
		const image = ref('/images/vectors/fingerpaint/bear.svg');
		const brush = reactive({ color: '#000', width: 50 });
		const drawer = reactive({
			isDrawing: false,
			ctx: null,
			handlers: {
				mousedown: () => {
					drawer.isDrawing = true;
					drawer.ctx.beginPath();
				},
				mousemove: ({ offsetX, offsetY }) => {
					if (!drawer.isDrawing) return;
					drawer.ctx.strokeStyle = brush.color;
					drawer.ctx.lineWidth = brush.width;
					drawer.ctx.lineCap = 'round';
					drawer.ctx.lineJoin = 'round';
					drawer.ctx.lineTo(offsetX, offsetY);
					drawer.ctx.stroke();
				},
				mouseup: () => {
					drawer.isDrawing = false;
					drawer.ctx.closePath();
				},
			},
		});

		onMounted(() => {
			const { clientHeight, clientWidth } = canvas.value.parentNode;
			canvas.value.height = clientHeight;
			canvas.value.width = clientWidth;
			drawer.ctx = canvas.value.getContext('2d');
		});

		return { canvas, drawer, image };
	},
};
</script>

<style lang="scss">
.drawer {
	position: relative;

	img {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		object-fit: contain;
		transform: translate(-50%, -50%);
	}
}
</style>
