<template>
  <div>
    <v-dialog
      v-model="showActivationAlert"
      class="activation-alert"
      max-width="452"
    >
      <v-card class="pa-5 pb-2 activation-alert">
        <div class="text-center pb-4 pt-2">
          <!-- <div>
            <v-icon x-large class="mb-2" color="#0F6D39">
              mdi-checkbox-marked-circle-outline
            </v-icon><br>
            <span class="medium-font">هل تريد قبول هذا العميل</span>
          </div> -->
          <div>
            <v-icon x-large class="mb-2" color="#ed4266">
              mdi-close-circle-outline
            </v-icon><br>
            <span class="medium-font">هل تريد رفض هذا العميل</span>
          </div>
        </div>
        <v-card-actions class="action-btns">
          <v-btn :loading="loading" @click="verify">
            {{ $t('btn.yes') }}
          </v-btn>
          <v-btn class="cancel" @click="showActivationAlert = false">
            {{ $t('btn.no') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CustomersServices from '~/services/global'
export default {
  name: 'ActivationAlert',
  props: {
    alertVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showActivationAlert: false,
      loading: false
    }
  },
  computed: {
    facility () {
      return {
        ...this.$store.state.facilities.facility,
        id: this.$route.params.id
      }
    }
  },
  watch: {
    alertVisible () {
      if (this.alertVisible === true) {
        this.showActivationAlert = true
      }
    },
    showActivationAlert () {
      if (this.showActivationAlert === false) {
        this.$emit('closeActivationModal', { value: true })
      }
    }
  },
  methods: {
    async verify () {
      this.loading = true
      await CustomersServices.verifyFacility(
        this.$axios,
        this.facility.id
      ).then((resData) => {
        this.$store.dispatch('global/showDetails', this.facility.id)
        this.setAlertDataGlobal(resData)
        this.showActivationAlert = false
      })
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.activation-alert {
  // min-height: 234px;
  border-radius: 20px;
  span {
    font-weight: 300;
    font-size: 15px;
  }
}
</style>
