<template>
	<div class="center">
		<transition-group
			tag="ul"
			name="radial"
			class="radial">
			<li
				v-for="(child, i) in concept.children"
				:key="child.id"
				class="radial__child"
				:style="position(i)"
				@click="selectConcept(child)">
				<div :class="['card', { empty: !child.media }]">
					<h4 class="title">{{ child.name }}</h4>
					<figure v-if="child.media" class="cover attribution faded">
						<img :src="child.media[0].url" :alt="child.name">
						<figcaption>{{ child.media[0].filename }}</figcaption>
					</figure>
					<!--p>{{ child.description }}</p-->
				</div>
			</li>
			<li key="root" class="radial__root" @click="back">
				<div :class="['card', { empty: !concept.media }]">
					<h4 class="title">{{ concept.name || 'root' }}</h4>
					<figure v-if="concept.media" class="cover attribution faded">
						<img :src="concept.media[0].url" :alt="concept.name">
						<figcaption>{{ concept.media[0].filename }}</figcaption>
					</figure>
				</div>
			</li>
		</transition-group>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import airtable from '/@/apis/airtable';

export default {
	setup() {
		const ELLIPSE_HEIGHT = 600;
		const ELLIPSE_WIDTH = 350;
		const concepts = ref({});
		const path = ref([]);

		const concept = computed(() => {
			const [current] = path.value.slice(-1);
			const { _children = [], ...rest } = current || {};
			const children = current
				? _children.map(child => concepts.value[child]).filter(Boolean)
				: Object.values(concepts.value).filter(({ _parent }) => !_parent);
			return { ...rest, children };
		});

		const position = i => {
			const rad = i * ((2 * Math.PI) / concept.value.children.length) - 2;
			const radius = (ELLIPSE_HEIGHT * ELLIPSE_WIDTH) / Math.sqrt(
				((ELLIPSE_HEIGHT * Math.cos(rad)) ** 2) + ((ELLIPSE_WIDTH * Math.sin(rad)) ** 2),
			);
			return `--angle:${rad}; --radius:${radius};`;
		};

		const selectConcept = item => path.value.push(item);
		const back = () => path.value.pop();

		onMounted(async () => {
			concepts.value = await airtable.getConcepts();
		});

		return { concept, position, selectConcept, back };
	},
};
</script>

<style lang="scss" scoped>
.radial {
	--angle: 0;
	--radius: 0;

	position: relative;

	.card {
		position: absolute;
		height: 250px;
		width: 200px;
		box-sizing: border-box;
		background: #e8e8e8;
		transform:
			translate(-50%, -50%)
			rotate(calc(-1rad * var(--angle)));

		&.empty {
			background: #fff;
			border: 2px dashed #e8e8e8;
		}
	}

	&__child {
		position: absolute;
		transform:
			rotate(calc(1rad * var(--angle)))
			translateX(calc(1px * var(--radius)))
			scale(0.75);

		&::before {
			content: '';
			position: absolute;
			display: block;
			border-top: 2px dashed #e8e8e8;
			width: calc(1.5px * var(--radius));
			right: 100%;
		}
	}
}

.radial-enter-active,
.radial-leave-active {
	transition: all 0.5s ease-in;

	&::before { transition: inherit; }
}

.radial-enter-from,
.radial-leave-to {
	transition-timing-function: ease-out;
	opacity: 0;
	transform:
		rotate(calc(1rad * var(--angle)))
		translateX(0)
		scale(0.75);

	&::before {
		transition: inherit;
		width: 0;
	}
}
</style>
