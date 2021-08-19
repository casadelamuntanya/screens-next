import L from 'leaflet';

const uuid = () => Math.random().toString(36).substring(7);

export default function useGeoJSON(map) {
	const LAYERS = {};

	const removeLayer = name => {
		if (LAYERS[name]) {
			LAYERS[name].remove();
			delete LAYERS[name];
		}
	};

	const addLayer = async (source, { name = uuid(), onLoad, ...options }) => {
		if (LAYERS[name]) removeLayer(name);
		const data = typeof source === 'string' ? await (await fetch(source)).json() : source;
		const layer = L.geoJson(data, options);
		if (onLoad) layer.on('add', () => onLoad(layer));
		layer.addTo(map);
		LAYERS[name] = layer;
	};

	return { addLayer, removeLayer };
}
