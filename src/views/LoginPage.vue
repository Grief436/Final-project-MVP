<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Welcome Back</h1>
      <p class="subtitle">Sign in to continue</p>

      <form @submit.prevent="handleLogin" class="form">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="demo@example.com" />

        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />

        <button type="submit" class="login-btn">Sign In</button>

        <p v-if="error" class="error">{{ error }}</p>

        <p class="demo-hint">
          Demo login: <strong>demo@example.com</strong> / <strong>password123</strong>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { login } from "@/lib/api";
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const email = ref('demo@example.com')
const password = ref('password123')
const error = ref('')

const auth = useAuthStore()

const handleLogin = async () => {
  error.value = ''

  try {
    await auth.login(email.value, password.value)

    
    window.location.href = "https://vue-basic-template.rmonta23.workers.dev"

  } catch (err) {
    error.value = 'Invalid email or password'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #6d28d9);
  padding: 20px;
}

.login-card {
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

.login-btn {
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

.login-btn:hover {
  background: #4338ca;
}

.error {
  margin-top: 12px;
  color: #d32f2f;
  text-align: center;
}

.demo-hint {
  margin-top: 16px;
  font-size: 13px;
  text-align: center;
  color: #555;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
