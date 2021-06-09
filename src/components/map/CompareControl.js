import { Control, Util, DomUtil, DomEvent } from 'leaflet';
import './control.compare.css';

const asArray = item => (Array.isArray(item) ? item : [item]);
const constrain = (number, min, max) => Math.min(max, Math.max(min, number));

/* eslint-disable no-underscore-dangle */
export default Control.extend({
	options: {
		position: 'topleft',
		thumbPosition: '50%',
		orientation: 'horizontal',
	},

	initialize(beforeLayers, afterLayers, options) {
		Util.setOptions(this, options);

		this._beforeLayers = asArray(beforeLayers);
		this._afterLayers = asArray(afterLayers);
		this._beforeLayer = this._beforeLayers[this._beforeLayers.length - 1];
		this._afterLayer = this._afterLayers[this._afterLayers.length - 1];

		this._horizontal = this.options.orientation === 'horizontal';
	},

	onAdd(map) {
		const { orientation, thumbPosition } = this.options;
		const { x: width, y: height } = map.getSize();

		this._map = map;

		this._compare = DomUtil.create('div', 'map-compare');
		this._compare.style.height = `${height}px`;
		this._compare.style.width = `${width}px`;

		this._divider = DomUtil.create('div', `map-compare-${orientation}`, this._compare);
		this._thumb = DomUtil.create('div', 'map-compare-thumb', this._divider);

		DomEvent.on(this._thumb, 'mousedown', this._onDown, this);
		DomEvent.on(this._thumb, 'touchstart', this._onDown, this);

		this._map.on('move', this._update, this);
		this._map.on('resize', this._onResize, this);
		this._map.on('layeradd layerremove', this._changeLayers, this);

		this._setThumbPosition(thumbPosition);
		this._update();

		return this._compare;
	},

	_changeLayers() {
		this._beforeLayers.forEach(layer => {
			if (this._map.hasLayer(layer)) this._beforeLayer = layer;
		});
		this._afterLayers.forEach(layer => {
			if (this._map.hasLayer(layer)) this._afterLayer = layer;
		});
		this._update();
	},

	_update() {
		if (!this._map) return this;

		const mapSize = this._map.getSize();
		const nw = this._map.containerPointToLayerPoint([0, 0]);
		const se = this._map.containerPointToLayerPoint(mapSize);

		const clip = (this._horizontal ? nw.x : nw.y) + this._thumbPosition;
		const beforeClip = this._horizontal
			? `rect(${[nw.y, clip, se.y, nw.x].join('px,')}px)`
			: `rect(${[nw.y, se.x, clip, nw.x].join('px,')}px)`;
		const afterClip = this._horizontal
			? `rect(${[nw.y, se.x, se.y, clip].join('px,')}px)`
			: `rect(${[clip, se.x, se.y, nw.x].join('px,')}px)`;

		if (this._beforeLayer) this._beforeLayer.getContainer().style.clip = beforeClip;
		if (this._afterLayer) this._afterLayer.getContainer().style.clip = afterClip;
		this._divider.style[this._horizontal ? 'left' : 'top'] = `${this._thumbPosition}px`;

		return this;
	},

	_setThumbPosition(thumbPosition) {
		const { x: width, y: height } = this._map.getSize();
		const max = this._horizontal ? width : height;

		const pos = typeof thumbPosition === 'string' && thumbPosition.includes('%')
			? (parseFloat(thumbPosition) * max) / 100
			: thumbPosition;

		this._thumbPosition = constrain(pos, 0, this._horizontal ? width : height);
		const isStart = this._thumbPosition === 0;
		const isEnd = this._horizontal
			? this._thumbPosition === width
			: this._thumbPosition === height;
		if (isStart || isEnd) this._divider.classList.add('leaflet-compare-div-end');
		else this._divider.classList.remove('leaflet-compare-div-end');

		this._update();
	},

	_onDown(event) {
		if (event.target !== this._thumb) return;
		if (event.touches) {
			DomEvent.on(this._thumb, 'touchmove', this._onDrag, this);
			DomEvent.on(this._thumb, 'touchend', this._onUp, this);
		} else {
			DomEvent.on(this._thumb, 'mousemove', this._onDrag, this);
			DomEvent.on(this._thumb, 'mouseup', this._onUp, this);
			DomEvent.on(this._thumb, 'mouseleave', this._onUp, this);
		}
		this._map.dragging.disable();
	},

	_onDrag(event) {
		const e = event.touches ? event.touches[0] : event;
		const { left, top } = this._compare.getBoundingClientRect();
		const thumbPosition = this._horizontal ? e.clientX - left : e.clientY - top;
		this._setThumbPosition(thumbPosition);
	},

	_onUp() {
		DomEvent.off(this._thumb, 'mousemove', this._onDrag, this);
		DomEvent.off(this._thumb, 'mouseup', this._onUp, this);
		DomEvent.off(this._thumb, 'mouseout', this._onUp, this);
		DomEvent.off(this._thumb, 'touchmove', this._onDrag, this);
		DomEvent.off(this._thumb, 'touchend', this._onDrag, this);
		this._map.dragging.enable();
	},

	_onResize() {
		this._setThumbPosition(this._thumbPosition);
	},

	onRemove() {
		this._map.off('move', this._updateClip, this);
		DomEvent.off(this._compare, 'mousedown', this._onDown, this);
		DomEvent.off(this._compare, 'touchstart', this._onDown, this);
	},
});
