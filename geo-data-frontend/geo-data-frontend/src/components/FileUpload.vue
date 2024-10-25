<template>
  <div>
    <h2>Upload GeoData File</h2>
    <input type="file" @change="onFileChange" />
    <button @click="uploadFile">Upload</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      message: ''
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      if (!this.selectedFile) {
        this.message = 'Please select a file to upload.';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      axios.post('http://localhost:3000/upload', formData)
        .then(response => {
            console.log({response})
          this.message = `File uploaded: ${response.data}`;
        })
        .catch(error => {
            console.log({error})
          this.message = `Error uploading file: ${error.response.data}`;
        });
    }
  }
};
</script>

<style scoped>
/* Add some basic styling here if you want */
</style>
