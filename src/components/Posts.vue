<template>
  <ion-content ref="content" fullscreen class="ion-padding">
    <ion-card
      v-for="(post, index) in posts"
      :key="index"
      @click="showPost(post._id)"
    >
      <ion-card-header>
        <ion-card-sibtitle>
          {{ post.date | moment('DD.MM.YYYY') }}
        </ion-card-sibtitle>
        <ion-card-title>
          {{ post.header }}
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <span v-html="post.description.substr(0, 200) + '...'"></span>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import PostModal from '@/components/PostModal.vue'

export default {
  data() {
    return {
      posts: []
    }
  },
  computed: {
    ...mapState([
      'authenticated',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentContent'
    ]),
    getPosts: async function(){
      try {
        let response = await axios.get(process.env.VUE_APP_API + '/api/posts')
        if(response.status === 200){
          let posts = response.data
          posts.sort((a, b) => {
            let dateA = new Date(a.date)
            let dateB = new Date(b.date)
            return dateB - dateA
          })
          this.posts = posts
          let toast = await this.$ionic.toastController.create({
            message: 'Данные обновлены',
            position: 'top',
            showCloseButton: true,
            duration: 2000
          })
          await toast.present()
        }
      } catch(err) {
        let toast = await this.$ionic.toastController.create({
          message: 'Ошибка обновления данных',
          position: 'top',
          showCloseButton: true,
          duration: 2000
        })
        await toast.present()
      }
    },
    showPost: async function(id) {
      try {
        let response = await axios.get(`${process.env.VUE_APP_API}/api/post/${id}`)
        let post = await response.data
        post.comments.sort((a, b) => {
          let dateA = new Date(a.date)
          let dateB = new Date(b.date)
          return dateB - dateA
        })
        let modal = await this.$ionic.modalController.create({
          component: PostModal,
          componentProps: {
            data: {
              description: post.description
            },
            propsData: {
              id: post._id,
              title: post.header,
              comments: post.comments,
              authenticated: this.authenticated,
              user: this.user
            }
          }
        });
        modal.present();
      } catch(err) {
        let toast = await this.$ionic.toastController.create({
          message: 'Ошибка получения данных',
          position: 'top',
          showCloseButton: true,
          duration: 2000
        })
        await toast.present()
      }
    }
  },
  mounted: function() {
    this.getPosts()
    this.setCurrentContent(this.$refs.content)
  }
}
</script>