<template>
	<figure class="ungutter" data-animate="fade-down">
		<img src="/images/trekking_gear.png">
	</figure>
	<section>
		<h1 data-animate="fade-up">{{ t('safety.equipment.equip_yourself') }}</h1>
		<p data-animate="fade-up" data-animate-delay-in="0.25s">
			{{ t('safety.equipment.proper_equipment') }}
		</p>
	</section>
	<section class="columns">
		<section class="column column--2" :data-tag-pre="t('safety.equipment.essentials')">
			<ul class="icon-list list-cols-2">
				<li
					v-for="(item, i) in equipment.essential"
					:key="item"
					data-animate="fade-left"
					:data-animate-delay-in="`${0.5 + i * 0.15}s`">
					<inline-svg :src="`/images/vectors/equipment/${item}.svg`" class="icon" />
					{{ t(`safety.equipment.items.${item}`) }}
				</li>
			</ul>
		</section>
		<section class="column" :data-tag-pre="t('safety.equipment.recommended')">
			<ul class="icon-list">
				<li
					v-for="(item, i) in equipment.recommended"
					:key="item"
					data-animate="fade-left"
					:data-animate-delay-in="`${0.5 + i * 0.15}s`">
					<inline-svg :src="`/images/vectors/equipment/${item}.svg`" class="icon" />
					{{ t(`safety.equipment.items.${item}`) }}
				</li>
			</ul>
		</section>
	</section>
	<section class="note" data-animate="fade-down">
		{{ t('safety.equipment.disclaimer') }}
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';
import { equipment } from '/@/config/views/safety.yaml';

export default {
	name: 'SafetyEquipment',
	components: { InlineSvg },
	setup() {
		const { t } = useI18n();

		return { t, equipment };
	},
};
</script>
