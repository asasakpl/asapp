import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0',
    status: '',
    error: false,
    err_text: '',
    err_icon: '',
    success: false,
    succ_text: '',
    succ_icon: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('m_user') || '',
    adminType: localStorage.getItem('m_type') || ''
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
    },
    success(state, { text, icon }) {
      state.success = true
      state.succ_text = text
      state.succ_icon = icon
    },
    error(state, { text, icon }) {
      state.error = true
      state.err_text = text
      state.err_icon = icon
    }
  },
  actions: {
    login({ commit }, user) {
      commit('auth_request')

      return axios({
        method: 'post',
        url: axios.defaults.baseURL + '/auth/su/login',
        data: { email: user.email, password: user.password }
      })
        .then((resp) => {
          const token = resp.data.token
          const user = resp.data.user

          // Set items in local storage
          localStorage.setItem('token', token)
          localStorage.setItem('m_user', user.id)
          localStorage.setItem('m_email', user.email)
          localStorage.setItem('m_name', user.firstName + ' ' + user.lastName)
          localStorage.setItem('m_type', user.type)

          if (localStorage.getItem('theme') == undefined) {
            localStorage.setItem('theme', 'light')
          }

          localStorage.setItem('i18n', 'en')

          axios.defaults.headers.common['auth'] = token
          commit('auth_success', { token, user })
          return user.permission
        })
        .catch((err) => {
          commit('auth_error')

          localStorage.removeItem('token')
          throw err
        })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        const theme = localStorage.getItem('theme')
        localStorage.clear()
        localStorage.setItem('theme', theme)
        delete axios.defaults.headers.common['auth']
        resolve()
      })
    },
    success({ commit }, succ_obj) {
      const text = succ_obj.text
      const icon = succ_obj.icon
      commit('success', { text, icon })
    },
    error({ commit }, err_obj) {
      const text = err_obj.text
      const icon = err_obj.icon
      commit('error', { text, icon })
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    appVersion: (state) => {
      return state.packageVersion
    },
    setSuccess: (state) => {
      const succ_obj = {
        text: state.succ_text,
        success: state.success,
        icon: state.succ_icon
      }
      return succ_obj
    },
    setError: (state) => {
      const err_obj = {
        text: state.err_text,
        error: state.error,
        icon: state.err_icon
      }
      return err_obj
    }
  }
})
