<template>
  <ion-content fullscreen class="ion-padding">
    <div class="account">
      <ion-item>
        <ion-label>Ваше имя: {{ user.name }}</ion-label>
      </ion-item>

      <div class="buttons">
        <ion-button @click="logout" expand="block" color="warning">Выйти</ion-button>
      </div>
    </div>
  </ion-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>