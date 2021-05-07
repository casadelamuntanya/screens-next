<template>
	<div id="safety" class="grid fill">
		<div class="row row--tight">
			<div class="col">
				<ul class="nav-sec">
					<li v-for="page in pages" :key="page.name">
						<router-link :to="`/safety/${page.path}`">
							{{ t(`safety.pages.${page.name}`) }}
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import pages from './safety/routes';

export default {
	name: 'Safety',
	setup() {
		const { t } = useI18n();
		return { t, pages };
	},
};
</script>
