<template>
  <div>
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="8">
          <div class="d-flex justify-space-between">
            <h3>Logo</h3>
            <div>
              links
            </div>
          </div>
          <div class="mt-4 white--text">
            <h3>اتفاقية الخصوصية</h3>
            <p>سياسة الخصوصية هذه تحدد كيف يستخدم ويحمي موقع "الدوائر السبع" أي من المعلومات الشخصية التي تقوم بتوفيرها لنا عند استخدامك لهذا الموقع.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'UnitsPage',
  layout: 'pages',
  data () {
    return {}
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/fetchUnitsList', {
      type: 'units'
    })
  },
  head: {
    title: 'الوحدات'
  }
}
</script>

<style lang='scss'></style>
