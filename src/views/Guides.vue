<template>
	<section class="guides-filters" data-animate="fade-down">
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
	<section class="stack" :data-tag="t('guides.mountain_guides')" data-animate="fade">
		<transition-group
			v-if="guides.length"
			tag="ul"
			name="list"
			class="guides"
			appear>
			<li
				v-for="(guide, i) in guides"
				:key="guide.name"
				:class="guideStatus(guide)"
				data-animate="fade-up"
				:data-animate-delay-out="`${i * 0.1}s`"
				:style="`--stagger-delay:${i * 0.1}s`">
				<div class="guide__preview" tabindex="1">
					<figure class="cover">
						<img :src="guide.photo[0].url" class="faded">
					</figure>
					<h2>{{ guide.name }}<small>{{ guide.surname }}</small></h2>
				</div>
				<!-- extended profile -->
				<div class="guide__extended">
					<img v-if="guide.qr" :src="guide.qr[0].url" class="qr-code">
					<figure class="cover">
						<img :src="guide.photo[guide.photo.length > 1 ? 1 : 0].url" class="faded">
					</figure>
					<h2>{{ guide.name }}<small>{{ guide.surname }}</small></h2>
					<p>{{ guide[`bio_${locale}`] }}</p>
					<p><strong>{{ t('guides.share_knowledge') }}</strong></p>
					<ul class="guide__knowledge">
						<li v-for="topic in guide.knowledge" :key="topic">
							{{ t(`guides.knowledge.${topic}`) }}
						</li>
					</ul>
				</div>
			</li>
		</transition-group>
		<p v-else class="loading">
			{{ t('guides.loading') }}
		</p>
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
		const { t, locale } = useI18n();
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

		return { t, locale, guides, guideStatus, filters };
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

	}

	&:focus-within .guide__preview,
	.inactive .guide__preview  {
		filter: saturate(0) opacity(0.1);
		pointer-events: none;
	}

	.guide__preview {
		transition: all 0.5s ease;
	}

	.guide__extended {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: 0;
		opacity: 0;
		width: 50%;
		visibility: hidden;
		z-index: 2;
		transform: translate(-50%, -50%);
		transition: all 0.5s ease;

		.qr-code {
			position: absolute;
			top: 0;
			right: 0;
			margin: var(--s);
			height: 5rem;
			width: 4rem;
		}
	}

	.guide__preview:focus + .guide__extended {
		visibility: visible;
		opacity: 1;
	}

	.guide__knowledge li {
		display: inline-block;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		padding: var(--xs) var(--s);
		margin: 1px;
		border-radius: var(--border-radius);
		opacity: 0.75;
		font-size: var(--s);
		text-transform: uppercase;
	}
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease var(--stagger-delay);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
