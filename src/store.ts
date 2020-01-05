import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0',
    status: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('m_user') || ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.userId = user
      return
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.userId = ''
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login({ commit }, user) {
      commit('auth_request')

      return axios({
        method: 'post',
        url: 'http://localhost:3000/v1/auth/login',
        data: { email: user.email, password: user.password }
      })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('m_user', user.id)

          axios.defaults.headers.common['auth'] = token
          commit('auth_success', { token, user })
          return user.permission
        })
        .catch(err => {
          commit('auth_error')

          localStorage.removeItem('token')
          throw err
        })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('m_user')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['auth']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    appVersion: state => {
      return state.packageVersion
    }
  }
})
