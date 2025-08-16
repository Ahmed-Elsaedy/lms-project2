import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CourseDetails from '../views/CourseDetails.vue'
import TeacherProfile from '../views/TeacherProfile.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import TeacherDashboard from '../views/TeacherDashboard.vue'
import CourseForm from '../views/CourseForm.vue'
import StudentDashboard from '../views/StudentDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/courses',
    name: 'Courses', 
    component: Courses
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/course/:id',
    name: 'CourseDetails',
    component: CourseDetails
  },
  {
    path: '/teacher/:id',
    name: 'TeacherProfile',
    component: TeacherProfile
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/teacher-dashboard',
    name: 'TeacherDashboard',
    component: TeacherDashboard
  },
  {
    path: '/course-form/:id',
    name: 'CourseForm',
    component: CourseForm
  },
  {
    path: '/student-dashboard',
    name: 'StudentDashboard',
    component: StudentDashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router