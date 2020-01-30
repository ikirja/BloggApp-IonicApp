<template>
  <div id="app">
    <ion-vue-router />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { SplashScreen } from '@capacitor/core'

export default {
  methods: {
    ...mapActions([
      'getUser'
    ])
  },
  mounted: function() {
    SplashScreen.hide()
    this.getUser()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap&subset=cyrillic');

body {
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #C1BDBE;
  background-color: #0A0A1E;
}

ion-navbar.toolbar.toolbar-ios.statusbar-padding,
ion-navbar.toolbar-ios ion-title.title-ios,
ion-toolbar.toolbar.toolbar-ios.statusbar-padding,
ion-toolbar.toolbar-ios ion-title.title-ios {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

.buttons {
  margin: 40px 0px;
}
</style>
