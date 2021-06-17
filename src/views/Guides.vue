<template>
	<section class="guides-filters">
		<i18n-t tag="p" keypath="guides.looking_for" class="natural-language-form">
			<template #language>
				<selector v-model="filters.language" :options="filters.languages" />
			</template>
			<template #discipline>
				<selector
					v-model="filters.discipline"
					:options="filters.disciplines"
					:format="option => t(`guides.disciplines.${option}`, option)" />
			</template>
		</i18n-t>
	</section>
	<section class="stack" :data-tag="t('guides.mountain_guides')">
		<ul v-if="guides.length" class="guides">
			<li v-for="guide in guides" :key="guide.name" :class="guideStatus(guide)">
				<figure class="cover">
					<img :src="guide.photo[0].url" class="faded">
				</figure>
				<h2>{{ guide.name }}<small>{{ guide.surname }}</small></h2>
			</li>
		</ul>
		<p v-else class="loading">{{ t('guides.loading') }}</p>
	</section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Selector from '/@/components/Selector.vue';
import airtable from '/@/apis/airtable';
import config from '/@/config/views/guides.yaml';

const api = airtable(config.api.base);

export default {
	name: 'Guides',
	components: { Selector },
	setup() {
		const { t } = useI18n();
		const guides = ref([]);
		const filters = reactive({
			languages: [],
			disciplines: [],
			language: null,
			discipline: null,
		});

		const guideStatus = guide => {
			const activeFilter = filters.language || filters.discipline;
			const doesSpeak = !filters.language || guide.languages.includes(filters.language);
			const isExpert = !filters.discipline || guide.disciplines.includes(filters.discipline);
			return ['guide', { inactive: activeFilter && (!doesSpeak || !isExpert) }];
		};

		onMounted(async () => {
			guides.value = await api.get(config.api.tables.guides);
			filters.languages = [...new Set(guides.value.flatMap(g => g.languages))];
			filters.disciplines = [null, ...new Set(guides.value.flatMap(g => g.disciplines))];
			[filters.language] = filters.languages;
		});

		return { t, guides, guideStatus, filters };
	},
};
</script>

<style lang="scss">
.guides {
	display: flex;
	flex-wrap: wrap;
	height: 100%;

	.guide {
		flex: 0 0 23%;
		margin: auto 5%;
		transition: all 0.5s ease;

		h2 {
			font-size: var(--xl);
			margin: -0.5em -0.5em 0;

			small {
				display: block;
				opacity: 0.5;
				font-size: 0.55em;
				line-height: 1.5;
			}
		}

		figure {
			margin: 0;
			padding-top: 120%;
		}

		&.inactive {
			filter: saturate(0) opacity(0.1);
			pointer-events: none;
		}
	}
}
</style>
