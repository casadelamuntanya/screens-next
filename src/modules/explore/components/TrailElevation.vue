<template>
  <div :id="id" class="elevation" />
</template>

<script>
import { watch, onMounted } from 'vue';
import { LatLng } from 'leaflet';

/* eslint-disable import/no-extraneous-dependencies */
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { min, max } from 'd3-array';
import { line } from 'd3-shape';
import { select } from 'd3-selection';

export default {
  name: 'TrailElevation',
  props: {
    id: { type: String, default: `e${Math.random().toString(36).substring(7)}` },
    trail: { type: Object, required: true },
  },
  setup(props) {
    const plot = trail => {
      const { coordinates } = trail.track.features[0].geometry;
      const BOTTOM_PADDING = 12;

      const container = select(`#${props.id}`);
      container.selectAll('*').remove();

      // Calculate accumulated distance for points
      const data = coordinates.reduce((acc, [lng, lat, alt]) => {
        const coord = new LatLng(lat, lng, alt);
        const prev = acc[acc.length - 1];
        const distance = prev ? prev.distance + prev.coord.distanceTo(coord) : 0;
        acc.push({ distance, coord });
        return acc;
      }, []);

      const { distance } = data[data.length - 1];
      const minAltitude = min(data, point => point.coord.alt);
      const maxAltitude = max(data, point => point.coord.alt);
      const drop = maxAltitude - minAltitude;

      const { width } = container.node().getBoundingClientRect();
      const height = Math.max(25, drop * (width / distance));
      const ticksX = 5;
      const ticksY = Math.max(Math.round(height / 20), 2);

      const plotX = scaleLinear()
        .domain([0, distance])
        .range([0, width]);

      const plotY = scaleLinear()
        .domain([minAltitude, maxAltitude])
        .range([height - BOTTOM_PADDING, 0]);

      const axisX = axisBottom(plotX)
        .ticks(ticksX)
        .tickFormat(value => `${value / 1000} km`);

      const axisY = axisLeft(plotY)
        .ticks(ticksY)
        .tickSize(-width)
        .tickFormat(value => `${value}m`);

      const plotLine = line()
        .x(point => plotX(point.distance))
        .y(point => plotY(point.coord.alt));

      const chart = container
        .append('svg')
        .attr('overflow', 'visible')
        .attr('width', width)
        .attr('height', height);

      // Axis
      chart.append('g')
        .attr('class', 'elevation__xaxis')
        .attr('transform', `translate(0, ${height - BOTTOM_PADDING})`)
        .call(axisX);

      chart.append('g')
        .attr('class', 'elevation__yaxis')
        .call(axisY);

      // Plot
      chart.append('path')
        .datum(data)
        .attr('class', 'elevation__line')
        .attr('d', plotLine);
    };

    watch(() => props.trail, plot);
    onMounted(() => { plot(props.trail); });

    return {};
  },
};
</script>

<style lang="scss">
.elevation {
  margin: var(--xl) 0;

  &__yaxis {
    text {
      fill: #0008;
      transform: translate(35px, -7px);
    }

    line {
      stroke: #0005;
      stroke-dasharray: 2;
    }

    .domain { display: none; }
  }

  &__xaxis {
    line { stroke: #0005; }
    text { fill: #0008; }
    .domain { stroke: #0008; }
  }

  &__line {
    fill: none;
    stroke: var(--color-primary);
    stroke-width: 2;
    stroke-linejoin: round;
  }
}

</style>
