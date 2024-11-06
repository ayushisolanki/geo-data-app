<template>
  <div>
    <h1>Geo-Data App</h1>
    <FileUpload @fileUploaded="onFileUploaded"/>
    <MapComponent :fileUrl="fileUrl"/>
    <LoginPage/>
    <SignupPage/>

  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue';
import SignupPage from './components/SignupPage.vue';
import MapComponent from './components/MapComponent.vue';
import FileUpload from "./components/FileUpload.vue"

export default {
  name: 'App',
  components: {
    MapComponent,
    LoginPage,
    SignupPage, 
    FileUpload
  },
  data() {
    return {
      message: "Waiting for API response...",
      fileUrl: "",
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

    onFileUploaded(fileUrl) {
      console.log({fileUrl})
      this.fileUrl = fileUrl;  // Update file URL when a file is uploaded
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
