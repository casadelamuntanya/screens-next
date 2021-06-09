<template>
	<div id="not-found" class="center">
		<figure class="attribution cover">
			<h1>404</h1>
			<img src="https://source.unsplash.com/KkCig7EbfoA/1100x800">¡
			<figcaption>© photo by Andrew Neel on Unsplash</figcaption>
		</figure>
		<section>
			<h1>{{ t('404.got_lost') }}</h1>
			<p>{{ t('404.not_here') }}</p>
		</section>
		<section>
			<p>
				<button class="btn" @click="back">{{ t('404.go_back') }}</button>
				<router-link to="/" class="btn btn--plain">{{ t('404.go_menu') }}</router-link>
			</p>
		</section>
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
	name: 'NotFound',
	setup() {
		const { t } = useI18n();
		const { back } = useRouter();
		return { t, back };
	},
};
</script>
