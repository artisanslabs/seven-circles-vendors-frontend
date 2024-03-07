<template>
  <div class="snackbar">
    <v-snackbar
      v-model="showAlert"
      :timeout="4000"
      top
      class="alert"
      :class="{
        'en-alert': $i18n.locale == 'en',
        'alert-error': !data.success
      }"
    >
      <span>
        {{ data.success ? $t('v.success') : $t('v.error') }} :
        {{ data.message }}
      </span>
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" icon @click="showAlert = false">
          <small>x</small>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'SharedAlert',
  props: {
    alertVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showAlert: false
    }
  },
  watch: {
    alertVisible () {
      if (this.alertVisible === true) {
        this.showAlert = true
      }
    },
    showAlert () {
      if (this.showAlert === false) {
        this.$emit('closeModal', { value: true })
      }
    }
  }
}
</script>
<style lang="scss">
.snackbar {
  z-index: 5000 !important;
}
.alert {
  .v-snack__wrapper {
    background-color: #47c55d !important;
    border-right: 8px solid #abddb4 !important;
    box-shadow: 0 10px 20px 0 rgba(71, 197, 93, 0.3);
    color: #fff;
    min-height: 37px !important;
    min-width: 240px !important;
    border-radius: 4px;
    padding-bottom: 2px;
  }
  .v-snack__content {
    padding: 9px 12px !important;
  }
  .v-snack__action .v-btn {
    min-width: 36px !important;
  }
  .v-btn__content {
    color: #47c55d;
    border-radius: 50%;
    background-color: #fff;
    width: 22px !important;
    height: 22px !important;
    small {
      margin-top: -7px;
      padding-left: 2px;
      font-size: 17px;
    }
  }
}

.en-alert {
  .v-snack__wrapper {
    border-left: 8px solid #abddb4 !important;
    border-right: none !important;
  }
  .v-btn__content {
    small {
      margin-top: -3px;
      padding-left: 0px;
    }
  }
}
.alert-error {
  .v-snack__wrapper {
    border-color: #f38484 !important;
    background-color: #f62526 !important;
    box-shadow: 0 10px 20px 0 rgba(230, 33, 33, 0.3);
  }
  .v-btn__content {
    color: #f62526;
  }
}
</style>
