import L from 'leaflet';

export default function useControls(map) {
	const CONTROLS = {};

	const addControl = (name, control) => {
		CONTROLS[name] = control;
		control.addTo(map);
	};

	const removeControl = name => CONTROLS[name].remove();

	const addZoom = options => addControl('zoom', L.control.zoom(options));
	const removeZoom = () => removeControl('zoom');

	const addAttribution = options => addControl('attribution', L.control.attribution(options));
	const removeAttribution = () => removeControl('attribution');

	const addScale = options => addControl('scale', L.control.scale(options));
	const removeScale = () => removeControl('scale');

	const addLayers = (baseLayers, overlays, options) => addControl('layers', L.control.layers(baseLayers, overlays, options));
	const removeLayers = () => removeControl('layers');

	return {
		addControl,
		removeControl,
		addZoom,
		removeZoom,
		addAttribution,
		removeAttribution,
		addScale,
		removeScale,
		addLayers,
		removeLayers,
	};
}
