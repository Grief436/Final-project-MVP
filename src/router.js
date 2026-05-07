import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import OtherPage from './views/OtherPage.vue';
import LoginPage from './views/LoginPage.vue';
import SignUpPage from './views/SignUpPage.vue'; // ⭐ NEW

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/signup', name: 'signup', component: SignUpPage }, // ⭐ NEW
  {
    path: '/dashboard',
    name: 'dashboard',
    component: OtherPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' });
  }
  next();
});

export default router;
