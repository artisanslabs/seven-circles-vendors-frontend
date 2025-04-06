<template>
  <div>
    <v-dialog v-model="showAlert" class="activation-alert" max-width="470" persistent>
      <v-card class="pa-5 activation-alert">
        <div v-if="item.status" class="text-center pt-6 mb-6">
          <p class="mb-n4">
            تأكيد إعادة تفعيل المنتج ؟
          </p><br>
          <!-- <small class="note">
            {{ $t('admins.active_label') }}
          </small> -->
        </div>
        <div v-else class="text-center pt-6 mb-6">
          <p class="mb-n4">
            تأكيد إلغاء تفعيل المنتج ؟
          </p><br>
          <!-- <small class="note">
            {{ $t('admins.deactive_label') }}
          </small> -->
        </div>
        <v-card-actions class="action-btns">
          <v-spacer />
          <v-btn :class="item.status ? 'active' : 'deactive'" class="add-btn" :loading="loading" @click="confirm">
            {{ $t('btn.confirm') }}
          </v-btn>
          <v-btn class="cancel-btn" @click="cancel">
            {{ $t('btn.no') }}
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import GlobalServices from '~/services/global.js'
export default {
  name: 'ActivateAndDeactivateDialog',
  props: {
    alertVisible: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showAlert: false,
      loading: false
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
  },
  methods: {
    async confirm () {
      this.loading = true
      const formData = new FormData()
      formData.append('_method', 'patch')
      const payload = { id: this.item.id, statusType: this.item.status ? 'publish' : 'un-publish', formData, type: 'products' }
      await GlobalServices.updateStatus(this.$axios, payload).then((resData) => {
        this.$emit('fecthData', { value: true })
        this.setAlertDataGlobal(resData)
        this.showAlert = false
      })
      this.loading = false
    },
    cancel () {
      this.showAlert = false
      this.$emit('fecthData', { value: true })
    }
  }
}
</script>
<style lang="scss" scoped>
.activation-alert {
  min-height: 180px;
  border-radius: 20px;
  span {
    font-weight: 300;
    font-size: 15px;
  }
}

.note {
  color: #707070;
  font-size: 13px;
    font-weight: 500;
}

.cancel-btn {
  background-color: transparent !important;
  border-radius: 5px;
  border: solid 1px #9ca6ba;
  box-shadow: none;
  color: #9ca6ba !important;
}

.cancel-btn,
.add-btn {
  height: 44px !important;
  padding: 10px 40px !important;
  width: 46% !important;
  min-width: 46%;
  .v-btn__content {
    margin-top: -2px;
  }
}

.active {
  background: #7fb712 !important;
}

.deactive {
  background: #b22234 !important;
}
</style>
