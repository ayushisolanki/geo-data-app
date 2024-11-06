<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="newEmail" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="newPassword" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        alert(response.data.message);
        this.$router.push('/login'); // Redirect to login after successful registration
      } catch (err) {
        this.error = err.response?.data?.error || 'Something went wrong';
      }
    },
  },
};
</script>

<style scoped>
/* Add some basic styling */
form {
  max-width: 300px;
  margin: 0 auto;
}
input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
}
button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
