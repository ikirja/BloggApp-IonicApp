<template>
  <ion-content fullscreen class="ion-padding">
    <ion-item v-if="!show">
      <ion-label position="floating">Ваш Логин:</ion-label>
      <ion-input :value="form.username" @input="form.username = $event.target.value"></ion-input>
    </ion-item>
    <ion-item v-if="show">
      <ion-label position="floating">Новый пароль:</ion-label>
      <ion-input :value="form.password" @input="form.password = $event.target.value" type="password"></ion-input>
    </ion-item>
    <ion-item v-if="show">
      <ion-label position="floating">Подтвердите новый пароль:</ion-label>
      <ion-input :value="form.confirm" @input="form.confirm = $event.target.value" type="password"></ion-input>
    </ion-item>
    <ion-item v-if="show">
      <ion-label position="floating">Код подтверждения:</ion-label>
      <ion-input :value="form.token" @input="form.token = $event.target.value"></ion-input>
    </ion-item>
    <div class="buttons">
      <ion-button v-if="!show" @click="forgotPassword" expand="block" color="success">Выслать ссылку</ion-button>
      <ion-button v-if="show" @click="setPassword" expand="block" color="success">Сохранить новый пароль</ion-button>
      <ion-button @click="close" expand="block">Назад</ion-button>
    </div>
  </ion-content>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirm: '',
        token: ''
      },
      show: false
    }
  },
  computed: {
    ...mapActions([
      'logout'
    ])
  },
  methods: {
    async forgotPassword() {
      try {
        let body = {
          username: this.form.username
        };
        let response = await axios(process.env.VUE_APP_API + '/api/forgot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: body
        });
        if(response.status === 200){
          let toast = await this.$ionic.toastController.create({
            message: 'Код для сброса пароля отправлен на Ваш адрес электронной почты',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          });
          this.show = !this.show;
          await toast.present()
        }
      } catch(err) {
        let toast = await this.$ionic.toastController.create({
          message: 'Произошла ошибка при сбросе пароля. Пожалуйста, повторите чуть позднее',
          position: 'top',
          showCloseButton: true,
          duration: 2000
        });
        await toast.present();
      }
    },
    async setPassword() {
      try {
        let body = {
          password: this.form.password,
          confirm: this.form.confirm,
          token: this.form.token
        };
        let response = await axios(process.env.VUE_APP_API + '/api/forgot/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: body
        });
        if(response.status === 200){
          let toast = await this.$ionic.toastController.create({
            message: 'Ваш пароль успешно изменён! Авторизуйтесь.',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          });
          await toast.present();
          this.$emit('show-form', 'hide-forgot-form');
        }
      } catch(err) {
        let toast = await this.$ionic.toastController.create({
          message: 'Произошла ошибка при сбросе пароля. Пожалуйста, повторите чуть позднее',
          position: 'top',
          showCloseButton: true,
          duration: 2000
        });
        await toast.present();
      }
    },
    close() {
      this.$emit('show-form', 'hide-forgot-form');
    }
  }
}
</script>