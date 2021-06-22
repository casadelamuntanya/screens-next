<template>
	<ul :class="['color-picker', { circular }]">
		<li
			v-for="(color, i) in [eraser, ...colors]"
			:key="color"
			:style="`--i:${i}; --color:${color}; --deg:${(360 / (colors.length + 1)) * i}deg`"
			:class="status(color)"
			tabindex="1"
			@click="select(color)">
			<slot :color="color" />
		</li>
	</ul>
</template>

<script>
const DEFAULT_PALETTE = ['#2c3e50', '#7f8c8d', '#bdc3c7', '#836953', '#bc9e82', '#27ae60', '#4cdb7c', '#6db8eb', '#2980b9', '#8e44ad', '#b975d5', '#f46354', '#c0392b', '#f39c12', '#f1cd3d'];

export default {
	name: 'ColorPicker',
	props: {
		modelValue: { type: String, default: undefined },
		colors: { type: Array, default: DEFAULT_PALETTE },
		eraser: { type: String, default: '#fff' },
		circular: { type: Boolean, default: false },
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const status = color => ({
			eraser: color === props.eraser,
			selected: color === props.modelValue,
		});
		const select = color => emit('update:modelValue', color);

		select(props.colors[0]);

		return { select, status };
	},
};
</script>

<style lang="scss">
.color-picker {
	display: inline-block;
	position: relative;
	font-size: var(--size-touch);
	height: 1em;
	width: 1em;
	vertical-align: middle;

	li {
		--i: 0;
		--color: #000;

		position: absolute;
		background: var(--color);
		transition: transform 0.5s ease;
		border-radius: 10px;
		z-index: 1;
		height: inherit;
		width: inherit;
		display: grid;
		place-items: center;

		& > * {
			transition: opacity 0.5s ease;
			opacity: 0;
			fill: #fff;
		}

		&.selected {
			z-index: 2;

			&::before {
				content: '';
				display: block;
				position: absolute;
				height: 100%;
				width: 100%;
				background: var(--color);
				transform: scale(1.25);
				border-radius: 10px;
				opacity: 0.5;
				z-index: -1;
			}

			& > * { opacity: 1; }
		}

		&.eraser {
			border: 2px solid #0002;
			overflow: hidden;

			&::after {
				content: '';
				display: block;
				position: absolute;
				border: 2px solid #f008;
				width: 120%;
				transform: rotate(-45deg);
			}

			&.selected { border-width: 5px }
		}
	}

	&:focus-within {
		li { transform: translateY(calc(-50% - 0.75em - 1.25em * var(--i))); }

		&::after {
			color: #0008;
			content: '\2715';
			display: block;
			font-size: 0.75em;
			line-height: 1.5em;
			text-align: center;
		}
	}

	&.circular:focus-within li {
		transform: rotate(var(--deg)) translateX(3.5em);
		& > * { opacity: 0 !important; }
	}
}
</style>
