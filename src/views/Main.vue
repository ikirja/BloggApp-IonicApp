<template>
  <div>

    <ion-tabs>
      <ion-tab tab="blog">
        <ion-header @click="scrollToTop" translucent>
          <ion-toolbar>
            <ion-title>Блог</ion-title>
          </ion-toolbar>
        </ion-header>
        <Posts />
      </ion-tab>
      <ion-tab tab="contacts">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Контакты</ion-title>
          </ion-toolbar>
        </ion-header>
        <Contacts />
      </ion-tab>
      <ion-tab tab="account">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Аккаунт</ion-title>
          </ion-toolbar>
        </ion-header>
        <Account
          v-if="authenticated"
        />
        <LoginForm
          v-if="!showRegisterForm && !showForgotForm && !authenticated"
          @show-form="showForm"
        />
        <RegisterForm
          v-if="showRegisterForm"
          @show-form="showForm"
        />
        <ForgotForm
          v-if="showForgotForm"
          @show-form="showForm"
        />
      </ion-tab>

      <!-- Tab bar -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="blog" @click="scrollToTop">
          <ion-icon name="list-box"></ion-icon>
          <ion-label>Блог</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="contacts">
          <ion-icon name="call"></ion-icon>
          <ion-label>Контакты</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="account">
          <ion-icon name="person"></ion-icon>
          <ion-label>Аккаунт</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Posts from '@/components/Posts.vue'
import Contacts from '@/components/Contacts.vue'
import Account from '@/components/Account.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import ForgotForm from '@/components/ForgotForm.vue'

export default {
  components: {
    Posts,
    Contacts,
    Account,
    LoginForm,
    RegisterForm,
    ForgotForm
  },
  data() {
    return {
      showRegisterForm: false,
      showForgotForm: false
    }
  },
  computed: {
    ...mapState([
      'authenticated',
      'currentContent'
    ])
  },
  methods: {
    scrollToTop() {
      this.currentContent.scrollToTop(1000)
    },
    showForm(val) {
      if(val === 'show-register-form'){
        this.showRegisterForm = true
        this.showForgotForm = false
      }
      if(val === 'show-forgot-form'){
        this.showRegisterForm = false
        this.showForgotForm = true
      }
      if(val === 'hide-register-form' || val === 'hide-forgot-form'){
        this.showRegisterForm = false
        this.showForgotForm = false
      }
    }
  }
}
</script>
