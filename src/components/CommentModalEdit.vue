<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>Редактирование комментария</ion-title>
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
        <ion-button @click="editComment" expand="block">Сохранить</ion-button>
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
    user: Object,
    updateComments: Function
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
    editComment: async function() {
      let token = localStorage.getItem('token')

      if(token){
        let body = {
          description: this.form.desc
        }

        try {
          let response = await axios(`${process.env.VUE_APP_API}/api/comment/${this.id}`, { 
            method: 'PUT',
            headers: { 
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            data: body
          });
          if(response.status === 200){
            this.updateComments(this.id, this.form.desc);
            let toast = await this.$ionic.toastController.create({
              message: 'Ваш комментарий успешно изменён',
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
              message: 'Произошла ошибка при cохранении комментария. Пожалуйста, попробуйте чуть позже',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            });
            this.closeModal();
            await toast.present();
          }
        } catch(err) {
          let toast = await this.$ionic.toastController.create({
            message: 'Произошла ошибка при cохранении комментария. Пожалуйста, попробуйте чуть позже',
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