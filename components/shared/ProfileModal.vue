<template>
  <v-dialog v-model="showModal" max-width="788" persistent>
    <v-card class="text-center px-8 py-4 modal-card">
      <div class="flex-between">
        <h2 class="text-start fs-20">
          {{ pageTitle }}
        </h2>
        <v-btn
          icon
          dark
          class="close-dialog-icon"
          @click="showModal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('v.name') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.full_name"
                type="text"
                :rules="[requiredRules, minLength]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('register.email') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.email"
                type="text"
                :rules="[requiredRules, minLength]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('register.password') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.password"
                :type="passwordStatus ? 'text' : 'password'"
                :append-icon="passwordStatus ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[requiredRules, minLength]"
                :value="form.password"
                validate-on-blur
                outlined
                dense
                @click:append="passwordStatus = !passwordStatus"
              />
            </v-col>

            <v-col cols="12" class="modal-btns mt-4 mb-6 d-flex justify-end">
              <v-btn :loading="loading" class="py-2 px-10 mx-2" @click="submit">
                {{ $t('btn.edit') }}
              </v-btn>
              <v-btn class="py-2 px-10 cancel-btn" @click="showModal = false">
                {{ $t('btn.cancel') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
// import GlobalServices from '~/services/global.js'
export default {
  name: 'ProfileModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      passwordStatus: false,
      showModal: false,
      clickedBtn: 'cancel',
      loading: false,
      form: {
        name: '',
        email: '',
        password: ''
      },
      oldForm: {},
      requiredRules: v => !!v || this.$t('v.field_required'),
      minLength: v => (v ? v.length >= 3 || this.$t('v.text_min_length') : ''),
      emailRules: [
        v => !!v || this.$t('v.field_required'),
        v =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || `${this.$t('register.email')} ${this.$t('v.valid')}`
      ]
    }
  },
  computed: {
    pageTitle () {
      return this.$t('users.update')
    }
  },
  watch: {
    dialogVisible () {
      if (this.dialogVisible === true) {
        this.showModal = true
      }
    },
    showModal () {
      if (this.showModal === false) {
        this.$emit('closeModal', { value: true, clickedBtn: this.clickedBtn })
        this.resetForm()
      }
    },
    user () {
      this.form = { ...this.user }
      this.oldForm = { ...this.user }
    }
  },
  methods: {
    async submit () {
      const valid = await this.$refs.form.validate()
      console.log(valid)
      // if (valid) {
      //   this.loading = true
      //   const formData = new FormData()
      //   for (const key in this.form) {
      //     if (this.form[key] !== this.oldForm[key]) {
      //       formData.append(key, this.form[key])
      //     }
      //   }
      //   const payload = { formData }
      //   let action = 'createUser'
      //   // for Updating user
      //   if (this.title !== 'add user') {
      //     formData.append('_method', 'patch')
      //     payload.id = this.user.id
      //     action = 'updateUser'
      //   }

      //   await GlobalServices[action](this.$axios, payload).then((resData) => {
      //     this.setAlertDataGlobal(resData)
      //     if (resData.success) {
      //       this.clickedBtn = 'save'
      //       this.showModal = false
      //     }
      //   })
      //   this.loading = false
      // }
    },
    resetForm () {
      this.$refs.form.reset()
      this.form = {
        name: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>
<style lang="scss">
</style>
