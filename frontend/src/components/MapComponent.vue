<template>
  <div ref="map" class="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import axios from 'axios';

export default {
  props: {
    fileUrl: String,  // Receive the file URL as a prop
  },
  data() {
    return {
      map: null,
      draw: null,
    };
  },
  mounted() {
    //todo: move to env
    mapboxgl.accessToken = "pk.eyJ1IjoiYXl1c2hpc29sYW5raSIsImEiOiJjbTJveW96bnEwZGR6MmpyMTFjNHY5d3B0In0.9dC4tZh9BnYovyyR12zRvA"
    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Initial coordinates
      zoom: 2,
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: true, 
      controls: {
        polygon: true,
        trash: true,
      },
    });

    this.map.addControl(this.draw);

    this.map.on('draw.create', this.onDrawCreate);
this.map.on('draw.update', this.onDrawUpdate);
this.map.on('draw.delete', this.onDrawDelete);

if (this.fileUrl) {

      this.loadGeoJSON(this.fileUrl);
    }

  },
  beforeUnmount() {
  // this.map.off('draw.create', this.onDrawCreate);
  // this.map.off('draw.update', this.onDrawUpdate);
  // this.map.off('draw.delete', this.onDrawDelete);
},
watch: {
    fileUrl(newUrl) {
      console.log("file...", newUrl)
      if (newUrl) {
        this.loadGeoJSON(newUrl);  // Watch for changes in file URL
      }
    },
  },
  methods: {
  onDrawCreate(event) {
    const data = event.features;
    console.log('New shapes drawn:', data);
    // Handle the new shapes (e.g., save them to state, display info, etc.)
  },

  onDrawUpdate(event) {
    const data = event.features;
    console.log('Shapes updated:', data);
    // Handle the updated shapes
  },

  onDrawDelete(event) {
    console.log('Shapes deleted:', event.features);
    // Handle deleted shapes
  },

  async loadGeoJSON(url) {
    console.log("checkpoint A")
      try {
        console.log("checkpoint 1", url)
        const response = await axios.get(`http://localhost:3000/api/files/file/${url}`);
        console.log("checkpoint 2", response)
        this.map.addSource('geojson-source', {
          type: 'geojson',
          data: response.data,
        });
        console.log("checkpoint 3")
        this.map.addLayer({
          id: 'geojson-layer',
          type: 'fill',
          source: 'geojson-source',
          paint: {
            'fill-color': 'red',
            'fill-opacity': 0.8,
          },
        });
        console.log("checkpoint 4")
      } catch (error) {
        console.error('Error loading GeoJSON', error);
      }
    },
},

};
</script>

<style>
.map {
  width: 100%;
  height: 500px; /* Adjust the height as needed */
}
</style>
