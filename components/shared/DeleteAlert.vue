<template>
  <div class="snackbar">
    <v-dialog v-model="showDeleteAlert" max-width="400">
      <v-card class="pa-5 pb-2">
        <div class="text-center pb-6">
          <h3>{{ multi ? $t('v.delete_items') : $t('v.delete_item') }}</h3>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="main-bg-color"
            @click="
              confirmDeleting = true
              showDeleteAlert = false
            "
          >
            {{ $t('btn.yes') }}
          </v-btn>
          <v-btn color="error" @click="showDeleteAlert = false">
            {{ $t('btn.no') }}
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'DeleteAlert',
  props: {
    alertVisible: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDeleteAlert: false,
      confirmDeleting: false
    }
  },
  watch: {
    alertVisible () {
      if (this.alertVisible === true) {
        this.showDeleteAlert = true
      }
    },
    showDeleteAlert () {
      if (this.showDeleteAlert === false) {
        this.$emit('closeDeleteModal', { value: this.confirmDeleting })
        this.confirmDeleting = false
      }
    }
  }
}
</script>
<style lang="scss"></style>
