import "bootstrap/dist/css/bootstrap.css"
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap/dist/js/bootstrap.js"

Vue.config.productionTip = false



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.getters.loggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})


router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && store.getters.loggedIn) {
     next({ name: 'home' })
  }
  else if (to.name === 'SignUp' && store.getters.loggedIn) {
      next({ name: 'home' })
  }
  else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
