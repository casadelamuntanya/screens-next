import { createI18n } from 'vue-i18n';
import errors from '/@/errors';
import { locales } from '/@/config/global.yaml';

const LOADED = [];

const i18n = createI18n({
	locale: locales.default,
	fallbackLocale: locales.default,
});

export const setLocale = async locale => {
	try {
		if (!locales.supported.includes(locale)) throw errors.LOCALE_NOT_SUPPORTED(locale);
		if (!LOADED.includes(locale)) {
			const response = await fetch(`${locales.location}/${locale}.json`);
			if (!response.ok) throw errors.LOCALE_NOT_AVAILABLE(locale, locales.location);
			const json = await response.json();
			i18n.global.setLocaleMessage(locale, json);
			LOADED.push(locale);
		}
		i18n.global.locale.value = locale;
		document.querySelector('html').setAttribute('lang', locale);
	} catch (error) { /* Send to Sentry? */ }
};

setLocale(locales.default);

export default i18n;
