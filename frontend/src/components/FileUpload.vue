<template>
  <div>
    <h2>Upload File</h2>
    <form @submit.prevent="handleUpload">
      <input type="file" @change="onFileChange" accept=".geojson,.kml,.tiff" />
      <button type="submit" :disabled="!file">Upload</button>
    </form>
    <div v-if="uploadError" class="error">{{ uploadError }}</div>
    <div v-if="uploadSuccess" class="success">{{ uploadSuccess }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      uploadError: null,
      uploadSuccess: null,
      fileUrl: "",
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async handleUpload() {
      if (!this.file) {
        this.uploadError = 'Please select a file';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const response = await axios.post('http://localhost:3000/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.uploadSuccess = 'File uploaded successfully';
        // Optionally: Use the returned filePath for map rendering
        console.log(response.data.filePath);
        this.fileUrl = response.data.filePath;
        console.log("fileUploaded", this.fileUrl)
        this.$emit('fileUploaded', this.fileUrl); 
      } catch (error) {
        this.uploadError = error.response ? error.response.data.error : 'Error uploading file';
      }
    },
  },
};
</script>
