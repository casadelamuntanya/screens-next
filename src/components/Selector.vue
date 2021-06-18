<template>
	<div class="selector" tabindex="1">
		<div class="selector__selected">{{ format(selected, label) || placeholder }}</div>
		<div class="selector__options">
			<label v-for="option in options" :key="format(option, label)">
				<input v-model="selected" :value="option" type="radio">
				<div class="selector__label">
					<slot :option="option">{{ format(option, label) }}</slot>
				</div>
			</label>
		</div>
	</div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
	name: 'Selector',
	props: {
		modelValue: { type: [Number, String, Object], default: undefined },
		options: { type: Array, required: true },
		label: { type: String, default: 'label' },
		format: { type: Function, default: (option, label) => option?.[label] || option },
		placeholder: { type: String, default: 'Select...' },
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const selected = ref(props.modelValue);

		watch(selected, value => {
			emit('update:modelValue', value);
		}, { immediate: true });

		watch(() => props.modelValue, value => { selected.value = value; });

		return { selected };
	},
};
</script>

<style lang="scss">
.selector {
	display: inline-block;
	position: relative;

	&__options {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 2;
		display: none;

		:focus > & { display: block; }

		input { display: none; }
	}
}
</style>
