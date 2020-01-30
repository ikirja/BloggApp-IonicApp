<template>
  <ion-content fullscreen class="ion-padding">
    <ion-item>
      <ion-label position="floating">Логин</ion-label>
      <ion-input :value="loginBody.username" @input="loginBody.username = $event.target.value"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Пароль</ion-label>
      <ion-input :value="loginBody.password" @input="loginBody.password = $event.target.value" type="password"></ion-input>
    </ion-item>
    <div class="buttons">
      <ion-button
        @click="login(loginBody)"
        expand="block"
      >
        Войти
      </ion-button>
      
      <div class="buttons-inline">
        <ion-button
          @click="showForm('show-register-form')"
          expand="block"
          color="success"
          class="buttons-inline__item"
        >
          Регистрация
        </ion-button>
        <ion-button
          @click="showForm('show-forgot-form')"
          expand="block"
          color="warning"
          class="buttons-inline__item"
        >
          Забыли пароль?
        </ion-button>
      </div>
    </div>
  </ion-content>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loginBody: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    showForm(val) {
      this.$emit('show-form', val)
    }
  }
}
</script>

<style scoped>
.buttons-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttons-inline__item {
  width: 45%;
}
</style>