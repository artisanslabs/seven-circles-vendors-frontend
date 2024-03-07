<template>
  <div class="d-flex justify-end action-btns">
    <v-btn id="Approve Button" @click="activateCustomer()">
      قبول
    </v-btn>
    <v-btn
      id="Reject Button"
      :loading="loading"
      class="reject"
      @click="updateCustomerDetails('rejectCustomer')"
    >
      رفض
    </v-btn>

    <activation-alert
      :alert-visible="openActivationDialog"
      @closeActivationModal="handleActivation"
    />
  </div>
</template>

<script>
import ActivationAlert from '~/components/customers/VerifyCustomer.vue'
import CustomersServices from '~/services/global'
export default {
  name: 'CustomerActions',
  components: { ActivationAlert },
  data () {
    return {
      openActivationDialog: false,
      loading: false
    }
  },
  computed: {
    customerDetails () {
      return this.$store.state.global.details
    }
  },
  methods: {
    activateCustomer () {
      this.openActivationDialog = true
    },
    handleActivation () {
      this.openActivationDialog = false
    },
    async updateCustomerDetails (action) {
      this.loading = true
      const formData = new FormData()
      formData.append('_method', 'patch')
      const payload = { id: this.customerDetails.id, formData }
      await CustomersServices[action](this.$axios, payload).then((resData) => {
        if (resData.success) {
          this.$store.dispatch('global/showDetails', this.customerDetails.id)
        }
        this.setAlertDataGlobal(resData)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
