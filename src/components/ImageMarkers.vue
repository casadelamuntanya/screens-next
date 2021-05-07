<template>
	<div class="image-markers">
		<slot />
		<div
			v-for="(marker, i) in markers"
			:key="`${marker.top}.${marker.left}`"
			:style="`top:${marker.top}%;left:${marker.left}%;`"
			class="image-markers__marker">
			<slot name="marker" :marker="marker" :i="i" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'ImageMarkers',
	props: { markers: { type: Array, required: true } },
};
</script>

<style lang="scss" scoped>
.image-markers {
	display: inline-block;
	position: relative;
	overflow: visible;

	&__marker {
		display: block;
		position: absolute;
		transform: translate(-50%, -50%);
		z-index: 0;
		overflow: visible;

		&:hover { z-index: 1; }
	}
}
</style>
