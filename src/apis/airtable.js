import { airtable } from '/@/config/apis.yaml';

const BASE_URL = 'https://api.airtable.com/v0';
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

const CONFIG = { headers: { Authorization: `Bearer ${TOKEN}` } };

const get = async resource => {
	const response = await fetch(`${BASE_URL}/${resource}`, CONFIG);
	const { records } = await response.json();
	return records.map(({ id, fields }) => ({ _id: id, ...fields }));
};

export default {
	getExploreTrails: () => get(`${airtable.explore.base}/${airtable.explore.trails}`),
	getFingerpaintDrawings: () => get(`${airtable.games.base}/${airtable.games.drawings}`),
	getMemoramaCards: () => get(`${airtable.games.base}/${airtable.games.cards}`),
	getGuides: () => get(`${airtable.guides.base}/${airtable.guides.guides}`),

	// Concepts are indexed by id
	getConcepts: async () => {
		const resource = `${airtable.discover.base}/${airtable.discover.concepts}`;
		const response = await fetch(`${BASE_URL}/${resource}`, CONFIG);
		const { records = [] } = await response.json();
		return records.reduce((acc, { id, fields }) => {
			acc[id] = { _id: id, ...fields };
			return acc;
		}, {});
	},
};
