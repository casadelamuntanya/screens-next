import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useControls from './controls';
import CompareControl from './CompareControl';

const injectToken = ({ options, ...rest }) => {
  const { token, ...other } = options;
  const accessToken = import.meta.env[token];
  return { ...rest, options: { ...other, accessToken } };
};

export default function useMap(container, options = {}) {
  const { controls = {}, tiles = [], ...mapOptions } = options;

  // Create tileLayers
  const tileLayers = tiles.reduce((acc, tile) => {
    const { name, url, options: tileOptions } = injectToken(tile);
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
  const { addControl, addZoom, addScale, addAttribution, addLayers } = useControls(map);
  if (controls.zoom) addZoom(controls.zoom);
  if (controls.scale) addScale(controls.scale);
  if (controls.attribution) addAttribution(controls.attribution);
  if (controls.layers) addLayers(tileLayers, null, controls.layers);
  if (controls.compare) {
    const { url, options: compareOptions, ...rest } = injectToken(controls.compare);
    const baseTiles = Object.values(tileLayers);
    const compareTile = L.tileLayer(url, compareOptions).addTo(map);
    const control = new CompareControl(baseTiles, compareTile, rest);
    addControl('control', control);
  }

  return map;
}
