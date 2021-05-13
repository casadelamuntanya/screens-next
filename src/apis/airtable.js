const BASE_URL = 'https://api.airtable.com/v0';
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

const CONFIG = { headers: { Authorization: `Bearer ${TOKEN}` } };

export default base => {
	const get = async table => {
		const response = await fetch(`${BASE_URL}/${base}/${table}`, CONFIG);
		const { records } = await response.json();
		return records.map(({ id, fields }) => ({ _id: id, ...fields }));
	};

	return { get };
};
