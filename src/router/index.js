import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import FirebaseLoginView from '@/views/FirebaseLoginView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/add-book',
    name: 'Add Book',
    component: AddBookView
  },
  {
    path: '/book-count',
    name: 'Get Book Count',
    component: GetBookCountView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/firebase-login',
    name: 'Firebase Login',
    component: FirebaseLoginView,
  },
  {
    path: '/firebase-register',
    name: 'Firebase Register',
    component: FirebaseRegisterView,
  },
  {
    path: '/weather',
    name: "Weather",
    component: WeatherView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router