<template>
  <v-app>
    <v-main class="main-background">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PagesLayout',
  data () {
    return {}
  },
  created () {
    this.$vuetify.rtl = this.$i18n.locale === 'ar'
  }
}
</script>

<style scoped>
.main-background {
  background: #AC995E;
}
.row {
  margin: 0 !important;
}
</style>
