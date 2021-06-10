<template>
	<section class="stack">
		<div class="drawer stack">
			<canvas ref="canvas" v-on="drawer.handlers" />
			<template v-if="selectedDrawing">
				<img :src="selectedDrawing.image[0].url">
				<p class="attribution">{{ selectedDrawing.attribution }}</p>
			</template>
		</div>
	</section>
	<section data-tag="dibuixos">
		<div v-dragscroll class="drawing-picker scroller" data-empty="No hi ha dibuixos">
			<label v-for="drawing in drawings" :key="drawing.name">
				<input v-model="selectedDrawing" :value="drawing" type="radio">
				<img :src="drawing.image[0].url">
			</label>
		</div>
	</section>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue';
import airtable from '/@/apis/airtable';
import config from '/@/config/views/playground.yaml';

const api = airtable(config.api.base);

export default {
	name: 'PlaygroundFingerpaint',
	setup() {
		const canvas = ref(null);
		const drawings = ref([]);
		const selectedDrawing = ref(undefined);
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
			clear: () => {
				const { width, height } = drawer.ctx.canvas;
				drawer.ctx.clearRect(0, 0, width, height);
			},
		});

		watch(selectedDrawing, () => drawer.clear());

		onMounted(async () => {
			drawings.value = await api.get(config.api.tables.drawings);
			[selectedDrawing.value] = drawings.value;

			const { clientHeight, clientWidth } = canvas.value.parentNode;
			canvas.value.height = clientHeight;
			canvas.value.width = clientWidth;
			drawer.ctx = canvas.value.getContext('2d');
		});

		return { canvas, drawer, drawings, selectedDrawing };
	},
};
</script>

<style lang="scss">
.drawing-picker {
	height: 10rem;
	text-align: center;

	label {
		margin: 0 2rem;
		flex: 0 0 7rem;
	}

	input { display: none; }
	img { height: 100%; }
}

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

	.attribution {
		position: absolute;
		bottom: 0;
		right: 0;
		font-size: var(--xs);
	}
}
</style>
