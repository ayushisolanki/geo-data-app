<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        // Store the JWT token
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        this.$router.push('/profile'); // Redirect to profile or dashboard
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
