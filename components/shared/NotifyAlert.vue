<template>
  <div class="notification">
    <!-- الإشعار -->
    <v-snackbar
      v-model="showNotifyAlert"
      :timeout="5000"
      bottom
      left
      class="notify-alert"
      transition="slide-x-reverse-transition"
    >
      <div class="d-flex align-center">
        <div class="alert_title">
          <h3>{{ notifyAlertData.title }}</h3>
          <p>
            {{ notifyAlertData.body }}
          </p>
        </div>
      </div>
      <template #action="{ attrs }">
        <v-btn
          class="close"
          text
          v-bind="attrs"
          icon
          @click="showNotifyAlert = false"
        >
          x
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    notifyAlertVisible: {
      type: Boolean,
      default: false
    },
    notifyAlertData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    num: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showNotifyAlert: false
    }
  },
  watch: {
    notifyAlertVisible () {
      if (this.notifyAlertVisible === true) {
        this.showNotifyAlert = true
      }
    },
    showNotifyAlert () {
      if (this.showNotifyAlert === false) {
        this.$emit('closeModal', { value: true })
      }
    }
  },
  methods: {
    getIconName (type) {
      if (type) {
        return 'accept-card'
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
