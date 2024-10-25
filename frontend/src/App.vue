<template>
  <div>
    <h1>Geo-Data App</h1>
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from './components/MapComponent.vue';

export default {
  name: 'App',
  components: {
    MapComponent
  },
  data() {
    return {
      message: "Waiting for API response...",
      results:[],
    };
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await fetch("http://localhost:3000/api/message");
        const data = await response.json();
        console.log({ data });
        this.message = data.message;
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    },

    async fetchSearchResults(query) {
      console.log("fetchSearchResults called")
      try {
        const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log("Search Results:", data.results);
        this.results= data.results;
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
