<template>
  <v-app dark>
    <div class="centered-content">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink :to="localePath({ name: 'index' })">
        عودة إلى الرئيسية
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "pages",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "الصفحة غير موجودة 404",
      otherError: "حدث خطأ",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  created() {
    this.$vuetify.rtl = this.$i18n.locale === "ar";
  },
};
</script>

<style scoped>
.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  text-align: center; /* Align text */
}

h1 {
  font-size: 20px;
  margin-bottom: 20px; /* Add spacing between elements */
}

a {
  color: inherit; /* Ensure the link matches the theme color */
  text-decoration: underline;
}
</style>
