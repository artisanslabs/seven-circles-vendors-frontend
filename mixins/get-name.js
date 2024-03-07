export default {
  methods: {
    getName (item) {
      if (item) {
        if (this.$i18n.locale === 'ar') {
          return item.name_ar
        } else {
          return item.name_en
        }
      }
    }
  }
}
