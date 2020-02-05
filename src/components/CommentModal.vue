<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>Новый комментарий</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Закрыть</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <ion-item>
        <ion-label position="floating">Ваш комментарий</ion-label>
        <ion-textarea :value="form.desc" @input="form.desc = $event.target.value"></ion-textarea>
      </ion-item>
      <div class="buttons">
        <ion-button @click="addComment" expand="block">Добавить</ion-button>
      </div>
    </ion-content>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modal',
  props: {
    id: String,
    authenticated: Boolean,
    user: Object
  },
  data() {
    return {
      form: {
        desc: ''
      }
    }
  },
  methods: {
    closeModal() {
      this.$ionic.modalController.dismiss()
    },
    addComment: async function() {
      let token = localStorage.getItem('token')

      if(token){
        let body = {
          description: this.form.desc,
          post: this.id
        }

        try {
          let response = await axios(process.env.VUE_APP_API + '/api/comment', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            data: body
          })

          if(response.status === 200){
            let toast = await this.$ionic.toastController.create({
              message: 'Ваш комментарий успешно добавлен',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            })
            this.closeModal();
            await toast.present();
          } else if(response.status === 401){
            let toast = await this.$ionic.toastController.create({
              message: 'Вы не авторизованы. Пожалуйста, авторизуйтесь!',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            });
            this.closeModal();
            await toast.present();
            this.logout();
          } else {
            let toast = await this.$ionic.toastController.create({
              message: 'Произошла ошибка при добавлении комментария. Пожалуйста, попробуйте чуть позже',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            });
            this.closeModal();
            await toast.present();
          }
        } catch(err) {
          let toast = await this.$ionic.toastController.create({
            message: 'Произошла ошибка при добавлении комментария. Пожалуйста, попробуйте чуть позже',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          });
          this.closeModal();
          await toast.present();
        }
      } else {
        this.closeModal();
        this.logout();
      }
    }
  }
}
</script>