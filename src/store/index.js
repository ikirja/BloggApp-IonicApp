import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: {
      id: '',
      name: '',
      isAdmin: false
    },
    currentContent: null
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
      state.authenticated = true
    },
    logout: (state) => {
      state.authenticated = false
      state.user = {
        id: '',
        name: '',
        isAdmin: false
      }
    },
    setCurrentContent: (state, content) => {
      state.currentContent = content
    }
  },
  actions: {
    getUser: async function (context) {
      let token = localStorage.getItem('token')

      if(token){
        try {
          let response = await axios.get(process.env.VUE_APP_API + '/api/user', {
            headers: { 'Authorization': 'Bearer ' + token }
          })
          if(response.status === 200) {
            context.commit('setUser', response.data)
          } else {
            context.commit('logout')
            let toast = await this._vm.$ionic.toastController.create({
              message: 'Произошла ошибка получения Ваших данных, зайдите в Ваш аккаунт заново',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            })
            await toast.present()
          }
        } catch(err) {
          let toast = await this._vm.$ionic.toastController.create({
            message: 'Произошла ошибка получения Ваших данных, зайдите в Ваш аккаунт заново',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present()
        }
      }
    },
    login: async function (context, body) {
      try {
        let response = await axios({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          url: process.env.VUE_APP_API + '/api/login',
          data: body
        })
        if(response.status === 200){
          localStorage.setItem('token', response.data)
          context.dispatch('getUser')
          let toast = await this._vm.$ionic.toastController.create({
            message: 'Вы успешно авторизовались',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present()
        } else {
          let toast = await this._vm.$ionic.toastController.create({
            message: 'Проверьте правильность логина и/или пароля',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present()
        }
      } catch(err) {
        let toast = await this._vm.$ionic.toastController.create({
          message: 'Проверьте правильность логина и/или пароля',
          position: 'top',
          showCloseButton: true,
          duration: 2000
        })
        await toast.present()
      }
    },
    logout: async function (context) {
      try {
        let response = await axios.get(process.env.VUE_APP_API + '/api/logout')
        if(response.status === 200){
          localStorage.removeItem('token')
          context.commit('logout')
          let toast = await this._vm.$ionic.toastController.create({
            message: 'Вы успешно вышли из своего аккаунта',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present()
        } else {
          let toast = await this._vm.$ionic.toastController.create({
            message: 'Произошла ошибка, попробуйте чуть позже',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present()
        }
      } catch(err) {
        let toast = await this._vm.$ionic.toastController.create({
          message: 'Произошла ошибка, попробуйте чуть позже',
          position: 'top',
          showCloseButton: true,
          duration: 2000
        })
        await toast.present()
      }
    },
    register: async function (context, body) {
      try {
        let response = await axios(process.env.VUE_APP_API + '/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: body
        })
        if(response.status === 200){
          localStorage.setItem('token', response.data)
          context.dispatch('getUser')
          let toast = await this._vm.$ionic.toastController.create({
            message: 'Вы успешно зарегистрировались',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present()
        }
      } catch(err) {
        console.log(err);
        let toast = await this._vm.$ionic.toastController.create({
          message: 'Произошла ошибка, попробуйте чуть позже',
          position: 'top',
          showCloseButton: true,
          duration: 2000
        })
        await toast.present()
      }
    },
    setCurrentContent: function (context, content) {
      context.commit('setCurrentContent', content)
    }
  },
  modules: {
  }
})
