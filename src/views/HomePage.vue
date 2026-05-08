<template>
  <div class="home-container">
    <div class="hero">
      <h1 class="title">Habit Tracker</h1>
      <p class="subtitle">
        Build better routines, stay consistent, and track your progress with a clean and simple dashboard.
      </p>

      <div class="actions">
        <router-link to="/login" class="btn primary">Sign In</router-link>
        <router-link to="/signup" class="btn secondary">Create Account</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: linear-gradient(135deg, #4f46e5, #6d28d9);
  color: white;
  text-align: center;
}

.hero {
  max-width: 700px;
}

.title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s;
}

.primary {
  background: white;
  color: #4f46e5;
}

.primary:hover {
  background: #e5e5ff;
}

.secondary {
  border: 2px solid white;
  color: white;
}

.secondary:hover {
  background: rgba(255,255,255,0.15);
}
</style>
