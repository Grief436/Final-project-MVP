import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import OtherPage from './views/OtherPage.vue'
import LoginPage from './views/LoginPage.vue'
import SignUpPage from './views/SignUpPage.vue'
import { useAuthStore } from './stores/auth'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/signup', name: 'signup', component: SignUpPage },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: OtherPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login' }
  }
})

export default router
