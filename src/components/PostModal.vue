<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Закрыть</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <span v-html="description"></span>

      <ion-button
        v-if="authenticated"
        @click="commentModal"
        expand="block"
        color="success"
        size="small"
        class="button__comment"
      >
        Добавить комментарий
      </ion-button>

      <p v-if="!authenticated" class="comment">
        Чтобы оставить комментарий, пожалуйста, зарегистрируйтесь или войдите в свою учётную запись.
      </p>

      <div v-if="comments.length > 0">
        <hr class="line">

        <h6>Комментарии:</h6>
        <div
          v-for="(comment, index) in comments"
          :key="index"
        >
          <h6>{{ comment.date | moment('DD MMMM YYYY')}}</h6>
          <h4>{{ comment.author.name }}</h4>
          <p>{{ comment.description }}</p>

          <ion-button
            v-if="authenticated && user.id === comment.author.id"
            @click="commentModalEdit(comment._id, comment.description)"
            expand="block"
            color="warning"
            size="small"
          >
            Редактировать
          </ion-button>
          <ion-button
            v-if="authenticated && user.id === comment.author.id"
            @click="commentDelete(comment._id)"
            expand="block"
            color="danger"
            size="small"
          >
            Удалить
          </ion-button>
          <hr class="line">
        </div>
      </div>
    </ion-content>
  </div>
</template>

<script>
import axios from 'axios';
import CommentModal from '@/components/CommentModal.vue';
import CommentModalEdit from '@/components/CommentModalEdit.vue';

export default {
  name: 'modal',
  props: {
    id: String,
    title: {
      type: String,
      default: 'Заголовок'
    },
    comments: Array,
    authenticated: Boolean,
    user: Object
  },
  data() {
    return {
      description: 'Описание',
      showPost: true,
      showAddComment: false,
      form: {
        desc: ''
      }
    }
  },
  methods: {
    closeModal() {
      this.$ionic.modalController.dismiss()
    },
    async commentModal() {
      let modal = await this.$ionic.modalController.create({
        component: CommentModal,
        componentProps: {
          propsData: {
            id: this.id,
            authenticated: this.authenticated,
            user: this.user
          }
        }
      });
      modal.present();
    },
    async commentModalEdit(commentId, desc) {
      let modal = await this.$ionic.modalController.create({
        component: CommentModalEdit,
        componentProps: {
          data: {
            form: {
              desc: desc
            }
          },
          propsData: {
            id: commentId,
            authenticated: this.authenticated,
            user: this.user,
            updateComments: this.updateComments
          }
        }
      });
      modal.present();
    },
    commentDelete: async function(id){
      let token = localStorage.getItem('token')

      if(token){
        try {
          let response = await axios(`${process.env.VUE_APP_API}/api/comment/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
          })
          if(response.status === 200){
            let toast = await this.$ionic.toastController.create({
              message: 'Ваш комментарий успешно удалён',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            })
            this.comments = this.comments.filter(item => item._id !== id);
            await toast.present();
          } else if(response.status === 401){
            let toast = await this.$ionic.toastController.create({
              message: 'Вы не авторизованы. Пожалуйста, авторизуйтесь!',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            })
            await toast.present();
            this.logout()
          } else {
            let toast = await this.$ionic.toastController.create({
              message: 'Ошибка при удалении комментария',
              position: 'top',
              showCloseButton: true,
              duration: 2000
            })
            await toast.present();
          }
        } catch(err) {
          let toast = await this.$ionic.toastController.create({
            message: 'Ошибка при удалении комментария',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present();
        }
      } else {
        this.logout()
      }
    },
    updateComments(id, desc) {
      let index = this.comments.findIndex(item => item._id === id);
      this.comments[index].description = desc;
    }
  }
}
</script>

<style scoped>
.comment {
  font-size: 10px;
}
.button__comment {
  margin: 20px 0px;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
</style>