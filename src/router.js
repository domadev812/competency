import AdminDashboard from './views/AdminDashboard.vue'
import UserDashboard from './views/UserDashboard.vue'
import Login from './views/Login.vue'
// Admin Dashboard Page
import Users from './views/AdminDashboard/Users.vue'
// User Dashboard Page
import Overview from './views/UserDashboard/Overview.vue'
import Profile from './views/UserDashboard/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    redirect: '/admin/users',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/admin/users',
        component: Users
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: UserDashboard,
    redirect: '/dashboard/overview',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard/overview',
        component: Overview
      },
      {
        path: '/dashboard/profile',
        component: Profile
      }
    ]
  }
]

export default routes
