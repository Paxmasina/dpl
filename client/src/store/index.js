import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isUserLoggedIn: false,
    isAdmin: false,
    travel: null
  },
  mutations: {
    login (state, user) {
      state.user = user
      if (user.isAdmin === true) {
        state.isAdmin = true;
      } else 
        state.isUserLoggedIn = true
      
    },
    logout (state) {
      state.user = null
      state.isUserLoggedIn = false
      state.isAdmin = false
    },
    update(state, travel) {
      state.travel = travel
    }

  },
  actions: {
    login({commit}, user) {
      commit('login', user)
    },
    logout({commit}) {
      commit('logout')
    },
    update({commit}, travel) {
      commit('update', travel)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
