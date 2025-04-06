<template>
  <v-app>
    <v-main class="main-background">
      <SharedAlert
        :alert-visible="showAlertGlobal"
        :data="alertDataGlobal"
        @closeModal="isAlertClosed"
      />
      <div class="d-flex">
        <vertical-nav />
        <v-container fluid>
          <main-header />
          <div class="px-md-6 px-3 py-2">
            <Nuxt />
          </div>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MainHeader from "~/components/core/MainHeader.vue";
import VerticalNav from "~/components/core/VerticalNav.vue";
export default {
  name: "DefaultLayout",
  components: {
    MainHeader,
    VerticalNav,
  },
  middleware: ["auth"],
  data() {
    return {};
  },
  computed: {
    showAlertGlobal() {
      return this.$store.state.showAlert;
    },
    alertDataGlobal() {
      return this.$store.state.alertData;
    },
  },
  created() {
    this.$vuetify.rtl = this.$i18n.locale === "ar";
  },
};
</script>

<style scoped lang="scss">
.main-background {
  background: #f7f8fa;
}
</style>
