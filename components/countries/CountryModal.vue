<template>
  <v-dialog v-model="showModal" max-width="960" persistent>
    <v-card class="text-center px-8 py-4 modal-card">
      <div class="flex-between">
        <h2 class="text-start fs-20 title-color">
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
            <v-col cols="12" sm="12">
              <div class="text-start mb-2">
                <span>{{ $t('v.name') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-text-field
                v-model="form.name"
                placeholder="اكتب اسم الدولة"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12" class="modal-btns mt-4 mb-6 d-flex justify-end">
              <v-btn :loading="loading" class="py-6 px-10 mx-2" @click="submit">
                {{ $t('btn.save') }}
              </v-btn>
              <v-btn class="py-6 px-10 cancel-btn" @click="showModal = false">
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
import GlobalServices from '~/services/global.js'
export default {
  name: 'CountryModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'add country'
    },
    country: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showModal: false,
      passwordStatus: false,
      clickedBtn: 'cancel',
      loading: false,
      form: {},
      oldForm: {},
      requiredRules: v => !!v || this.$t('v.field_required'),
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false
    }
  },
  computed: {
    pageTitle () {
      return this.title === 'add country'
        ? this.$t('countries.create')
        : this.$t('countries.update')
    },
    cities () {
      return this.$store.state.list.cities
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
    country () {
      if (this.title !== 'add country') {
        this.form = { ...this.country }
        this.oldForm = { ...this.country }
      }
    }
  },
  methods: {
    async submit () {
      const valid = await this.$refs.form.validate()
      if (valid) {
        this.loading = true
        const formData = new FormData()
        for (const key in this.form) {
          if (this.form[key] !== this.oldForm[key]) {
            formData.append(key, this.form[key])
          }
        }
        const payload = { formData, type: 'countries' }
        let action = 'create'
        // for Updating country
        if (this.title !== 'add country') {
          formData.append('_method', 'patch')
          payload.id = this.country.id
          action = 'update'
        }

        await GlobalServices[action](this.$axios, payload).then((resData) => {
          this.setAlertDataGlobal(resData)
          if (resData.success) {
            this.clickedBtn = 'save'
            this.showModal = false
          }
        })
        this.loading = false
      }
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
.theme--light.v-file-input .v-file-input__text--placeholder {
    color: rgb(132 151 173);
    font-size: 12px;
}

.v-input--radio-group.v-input--radio-group--row .v-radio {
    align-items: flex-start;
}
</style>
