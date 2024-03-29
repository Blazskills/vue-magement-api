import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Logout from '../views/Logout.vue'
import Memberlist from '../views/memberList.vue'
import MemberReg from '../views/memberRegPage.vue'
import RecordArbitrage from '../views/ArbitrageReg.vue'
import Arbitragelist from '../views/ArbitrageList.vue'
import ArbitrageReport from '../views/ArbitrageP&l.vue'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresLogin: true,
    }
  },
  
  {
    path: '/computearbitrage',
    name: 'ArbitrageReport',
    component: ArbitrageReport,
    meta: {
      requiresLogin: true,
    }
  },
  {
    path: '/recordarbitrage',
    name: 'RecordArbitrage',
    component: RecordArbitrage,
    meta: {
      requiresLogin: true,
    }
  },

  
  {
    path: '/listarbitrage',
    name: 'Listarbitrage',
    component: Arbitragelist,
    meta: {
      requiresLogin: true,
    }
  },

      {
    path: '/login',
    name: 'Login',
    component: Login
  },
      {
    path: '/signup',
    name: 'SignUp',
        component: SignUp,
    
  },

  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  
   {
    path: '/memberlist',
    name: 'Memberlist',
    component: Memberlist,
     meta: {
      requiresLogin: true,
    }
  }, ,
    {
    path: '/memberreg',
    name: 'Memberreg',
      component: MemberReg,
     meta: {
      requiresLogin: true,
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
