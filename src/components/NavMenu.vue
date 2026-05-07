<template>
  <nav class="nav">
    <router-link to="/" class="nav-btn">Home</router-link>
    <router-link to="/dashboard" class="nav-btn">Dashboard</router-link>
    <router-link to="/login" class="nav-btn">Login</router-link>
    <router-link to="/signup" class="nav-btn primary">Sign Up</router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.nav-btn {
  padding: 8px 16px;
  background: white;
  border: 2px solid #4f46e5;
  color: #4f46e5;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s;
}

.nav-btn:hover {
  background: #4f46e5;
  color: white;
}

.primary {
  background: #4f46e5;
  color: white;
}

.primary:hover {
  background: #4338ca;
}
</style>
