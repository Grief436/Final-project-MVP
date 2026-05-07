<template>
  <div class="signup-container">
    <div class="signup-card">
      <h1 class="title">Create Account</h1>
      <p class="subtitle">Join us and get started</p>

      <form @submit.prevent="handleSignup" class="form">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />

        <label>Password</label>
        <input v-model="password" type="password" placeholder="Create a password" />

        <button type="submit" class="signup-btn">Sign Up</button>

        <p v-if="error" class="error">{{ error }}</p>

        <p class="login-link">
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '../api';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleSignup = async () => {
  error.value = '';
  try {
    await signup(email.value, password.value);
    router.push('/login');
  } catch {
    error.value = 'Unable to create account';
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #6d28d9);
  padding: 20px;
}

.signup-card {
  width: 100%;
  max-width: 380px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  animation: fadeIn 0.4s ease;
}

.title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}

.subtitle {
  margin-top: 4px;
  margin-bottom: 24px;
  text-align: center;
  color: #666;
}

.form label {
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
  display: block;
}

.form input {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 15px;
  transition: 0.2s;
}

.form input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
  outline: none;
}

.signup-btn {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.signup-btn:hover {
  background: #4338ca;
}

.error {
  margin-top: 12px;
  color: #d32f2f;
  text-align: center;
}

.login-link {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
