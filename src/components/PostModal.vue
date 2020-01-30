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
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    title: {
      type: String,
      default: 'Заголовок'
    }
  },
  data() {
    return {
      description: 'Описание'
    }
  },
  methods: {
    closeModal() {
      this.$ionic.modalController.dismiss()
    }
  }
}
</script>