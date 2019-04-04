import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App.vue'
import routes from './router'
import store from './store'
import * as jwt_token from 'jwt-decode'

Vue.config.productionTip = false

// configure router
Vue.use(VueRouter)
const router = new VueRouter({
  routes, // short for routes: routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth) {
    if (!localStorage.getItem('accessToken')) {
      next('/')
    } else {
      const userInfo = jwt_token(localStorage.getItem('accessToken'))
      if (userInfo) {
        if (userInfo.role !== 'admin' && to.path.indexOf('admin') !== -1) {
          next('/dashboard')
        } else if (userInfo.role === 'admin' && to.path.indexOf('dashboard') !== -1) {
          next('/admin')
        } else {
          next()
        }
      } else {
        localStorage.removeItem('accessToken')
        next('/')
      }
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
