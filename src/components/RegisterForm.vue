<template>
  <ion-content fullscreen class="ion-padding">
    <ion-item>
      <ion-label position="floating">Как Вас зовут?</ion-label>
      <ion-input :value="registerBody.name" @input="registerBody.name = $event.target.value"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Логин</ion-label>
      <ion-input :value="registerBody.username" @input="registerBody.username = $event.target.value"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Пароль</ion-label>
      <ion-input :value="registerBody.password" @input="registerBody.password = $event.target.value" type="password"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">E-mail</ion-label>
      <ion-input :value="registerBody.email" @input="registerBody.email = $event.target.value" type="email"></ion-input>
    </ion-item>
    <div class="buttons">
      <ion-button @click="registerUser(registerBody)" expand="block" color="success">Зарегистрироваться</ion-button>
      <ion-button @click="close" expand="block">Назад</ion-button>
    </div>
  </ion-content>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      registerBody: {
        name: '',
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    async registerUser(body) {
      this.$emit('show-form', 'hide-register-form')
      await this.register(body)
    },
    close() {
      this.$emit('show-form', 'hide-register-form')
    }
  }
}
</script>