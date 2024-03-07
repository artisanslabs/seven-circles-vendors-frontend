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
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('v.name') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-text-field
                v-model="form.name"
                placeholder="اكتب اسم المدينة"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('products.country') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-combobox
                v-model="form.country"
                placeholder="اختر الدولة"
                :items="countries"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
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
  name: 'CityModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'add city'
    },
    city: {
      type: Object,
      default: () => {
        return {}
      }
    },
    countries: {
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
      return this.title === 'add city'
        ? this.$t('cities.create')
        : this.$t('cities.update')
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
    city () {
      if (this.title !== 'add city') {
        this.form = { ...this.city }
        this.oldForm = { ...this.city }
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
          if (this.form[key] !== this.oldForm[key] && key !== 'country') {
            formData.append(key, this.form[key])
          }
        }
        formData.append('country_id', this.form.country.id)

        const payload = { formData, type: 'cities' }
        let action = 'create'
        // for Updating city
        if (this.title !== 'add city') {
          formData.append('_method', 'patch')
          payload.id = this.city.id
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
