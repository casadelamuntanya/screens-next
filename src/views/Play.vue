<template>
	<section v-if="isMain" class="stack">
		<ul class="nav-games">
			<li
				v-for="(route, i) in routes"
				:key="route.name"
				data-animate="fade-up"
				:data-animate-delay-in="`${i * 0.15}s`"
				:data-animate-delay-out="`${i * 0.15}s`">
				<figure class="cover">
					<img :src="`images/games/${route.name}/cover.jpg`">
				</figure>
				<h1>{{ t(`play.${route.name}.name`) }}</h1>
				<em>{{ t(`play.${route.name}.description`) }}</em>
				<p>
					<router-link :to="`/play/${route.path}`" class="btn">
						{{ t('play.start') }}
					</router-link>
				</p>
			</li>
		</ul>
	</section>
	<section v-else data-animate="fade-down">
		<router-link to="/play" class="btn btn--plain">
			<svg-inline src="/images/icons/arrow-left-s.svg" />
			{{ t('play.nav') }}
		</router-link>
	</section>
	<router-view />
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import SvgInline from 'vue-inline-svg';

export default {
	name: 'PlaygroundMenu',
	components: { SvgInline },
	setup() {
		const { t } = useI18n();
		const { getRoutes, currentRoute } = useRouter();
		const isMain = computed(() => currentRoute.value.name === 'play');
		const { children: routes } = getRoutes().find(({ name }) => name === 'play');
		return { t, routes, isMain };
	},
};
</script>

<style lang="scss">
.nav-games {
	margin: auto 0;

	li {
		display: block;
		position: relative;
		margin: 10rem var(--xxxl);
		padding: var(--xxxl) 0;
		color: var(--color-dark);
	}

	figure {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 100%;
		margin: 0;

		img {
			object-fit: contain !important;
			object-position: center right;
			opacity: 0.85;
		}
	}
}
</style>
