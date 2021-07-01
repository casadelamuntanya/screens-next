<template>
	<section
		v-for="(specie, i) in species"
		:key="specie.name"
		v-animate:fade
		:data-tag-pre="t(`safety.wildlife.${specie.name}.name`)"
		:class="specieClasses(i)">
		<figure v-animate:fade-right class="attribution cover">
			<img :src="specie.image.url" class="cover">
			<figcaption>{{ specie.image.attribution }}</figcaption>
		</figure>
		<section v-animate:fade-left>
			<h2>{{ t(`safety.wildlife.${specie.name}.name`) }}</h2>
			<p>{{ t(`safety.wildlife.${specie.name}.description`) }}</p>
			<p>{{ t(`safety.wildlife.${specie.name}.habitat`) }}</p>
			<p>
				<strong>{{ t(`safety.wildlife.${specie.name}.danger`) }}</strong>
			</p>
		</section>
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { species } from '/@/config/views/safety.yaml';

export default {
	name: 'SafetyWildlife',
	setup() {
		const { t } = useI18n();

		const specieClasses = index => [
			'stack',
			'block-image',
			`image-${species[index].image.layout}`,
			{ reverse: index % 2 === 1 },
		];

		return { t, species, specieClasses };
	},
};
</script>
