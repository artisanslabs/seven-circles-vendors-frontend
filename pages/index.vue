<template>
  <div>
    <v-row>
      <v-col class="text-center">
        <h2 v-if="$i18n.locale === 'en'">Seven Circle Admin Plateform</h2>
        <h2 v-else>لوحة تحكم الدوائر السيع</h2>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
