<template>
  <div ref="map" class="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export default {
  data() {
    return {
      map: null,
      draw: null,
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXl1c2hpc29sYW5raSIsImEiOiJjbTJveW96bnEwZGR6MmpyMTFjNHY5d3B0In0.9dC4tZh9BnYovyyR12zRvA'; // Replace with your access token

    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Set your initial coordinates
      zoom: 2,
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: false, // Hide default controls
      controls: {
        polygon: true,
        trash: true,
      },
    });

    this.map.addControl(this.draw);

    this.map.on('draw.create', this.onDrawCreate);
    this.map.on('draw.update', this.onDrawUpdate);
    this.map.on('draw.delete', this.onDrawDelete);
  },
  methods: {
    onDrawCreate(event) {
  const data = event.features;
  console.log('New shapes drawn:', data);
  
  // Example of adding a property to the shape
  data.forEach(feature => {
    feature.properties = {
      name: 'New Shape',
      description: 'This is a description of the shape.',
    };
  });

  // You can save this data to your backend here
}, 
    onDrawUpdate(event) {
      const data = event.features;
      console.log('Shapes updated:', data);
    },
    onDrawDelete(event) {
      console.log('Shapes deleted:', event.features);
    },
  },
  beforeUnmount() {
    this.map.off('draw.create', this.onDrawCreate);
    this.map.off('draw.update', this.onDrawUpdate);
    this.map.off('draw.delete', this.onDrawDelete);
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 1000px; /* Adjust the height as needed */
}
</style>
