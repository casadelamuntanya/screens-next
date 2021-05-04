export default {
	LOCALE_NOT_SUPPORTED: locale => new Error(`${locale} is not a supported locale`),
	LOCALE_NOT_AVAILABLE: (locale, url) => new Error(`Error loading ${locale} locale from ${url}`),
};
