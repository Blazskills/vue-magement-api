import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getApi } from "@/axios";

export default new Vuex.Store({
  state: {
        accessToken: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refresh'),
        APIData: '',
        allTenants:[],
  },
  // getters: {
  // },
  mutations: {
  
          updateStorage(state, {access, refresh}) {
            state.accessToken = access
            state.refreshToken = refresh
    },
           destroyToken (state) {
            state.accessToken = null
            state.refreshToken = null
    },
  },
  getters: {
       
    loggedIn (state) {
      return state.accessToken != null
    }
  },
  actions: {
     userLogout (context) {
      if (context.getters.loggedIn) {
          context.commit('destroyToken')
      }
    },
      userLogin(context,userCredentials) {
            return new Promise((resolve, reject) => {
                getApi.post('/auth/login/',{
                    email: userCredentials.email,
                    password: userCredentials.password
                })
                  .then((response) => {
                        context.commit('updateStorage', {access: response.data.token.access, refresh: response.data.token.refresh})
                        resolve(response)
                    }).catch((error) => {
                      // console.log(error)
                      reject(error)
                })
            })
    },
        
  },
  modules: {
  }
})
