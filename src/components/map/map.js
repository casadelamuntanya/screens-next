import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useControls from './controls';

export default function useMap(container, options = {}) {
	const { controls = {}, tiles = [], ...mapOptions } = options;

	// Create tileLayers
	const tileLayers = tiles.reduce((acc, tile) => {
		const { name, url, options: tileOptions } = tile;
		acc[name] = L.tileLayer(url, tileOptions);
		return acc;
	}, {});

	// Create map
	const map = L.map(container, {
		...mapOptions,
		layers: Object.values(tileLayers),
		attributionControl: false,
		zoomControl: false,
	});

	// Add controls
	const { addZoom, addScale, addAttribution, addLayers } = useControls(map);
	if (controls.zoom) addZoom(controls.zoom);
	if (controls.scale) addScale(controls.scale);
	if (controls.attribution) addAttribution(controls.attribution);
	if (controls.layers) addLayers(tileLayers, null, controls.layers);

	return map;
}
