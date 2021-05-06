<template>
	<section class="fill" :data-tag="t('navigation.menu')">
		<div class="nav-grid">
			<router-link
				v-for="route in routes"
				:key="route.name"
				:class="`nav-${route.name}`"
				:to="route.path">
				<h1 :class="route.title">{{ t(`navigation.${route.name}`) }}</h1>
				<figure>
					<img :src="route.image.url">
					<figcaption v-if="route.image.attribution">
						{{ route.image.attribution }}
					</figcaption>
				</figure>
			</router-link>
		</div>
	</section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { routes } from '/@/config/global.yaml';

export default {
	name: 'Home',
	setup() {
		const { t } = useI18n();
		return { t, routes };
	},
};
</script>
