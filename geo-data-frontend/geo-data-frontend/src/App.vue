<template>
  <div id="app">
    <h1>Geo-Data App</h1>
    <FileUpload />
    <!-- <MapComponent /> -->
    
  </div>
</template>

<script>
import FileUpload from './components/FileUpload.vue';
import MapComponent from './components/MapComponent.vue';

export default {
  name: 'App',
  components: {
    FileUpload,
    MapComponent
  }
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}
</style>
