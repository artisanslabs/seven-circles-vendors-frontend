export default {
  data () {
    return {
      showAlert: false,
      alertData: {}
    }
  },
  methods: {
    setAlertData (data) {
      this.alertData = data
      this.showAlert = true
    },
    setAlertDataGlobal (data) {
      this.$store.commit('setAlertData', data)
      this.$store.commit('setShowAlert', true)
    },
    isAlertClosed (payload) {
      if (payload.value) {
        this.showAlert = false
        this.$store.commit('setShowAlert', false)
      }
    }
  }
}
