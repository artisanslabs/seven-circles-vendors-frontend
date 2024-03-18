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
                <span>{{ $t('products.country') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
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
                @change="fetchCities"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('products.city') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-combobox
                v-model="form.city"
                placeholder="اختر المدينة"
                :items="cities"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('ads.start_date') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>

              <v-menu
                v-model="starts_at"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.starts_at"
                    placeholder="أختر تاريخ بداية الاعلان"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.starts_at"
                  locale="ar"
                  @input="starts_at = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('ads.end_date') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-menu
                v-model="ends_at"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.ends_at"
                    placeholder="أختر تاريخ نهاية الاعلان"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.ends_at"
                  locale="ar"
                  @input="ends_at = false"
                />
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>صورة  الإعلان</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-file-input
                v-model="form.image"
                placeholder="صورة  الإعلان"
                :rules="[requiredRules]"
                outlined
                dense
                append-icon="mdi-folder-multiple-image"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>{{ $t('products.details') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-textarea
                v-model="form.description"
                name="input-7-1"
                :rules="[requiredRules]"
                placeholder="ادخل تفاصيل الاعلان"
                outlined
                dense
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
  name: 'AdvertisementModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'add advertisement'
    },
    advertisement: {
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
      starts_at: false,
      ends_at: false,
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
      return this.title === 'add advertisement'
        ? this.$t('ads.create')
        : this.$t('ads.update')
    },
    cities () {
      return this.$store.state.support.cities
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
    advertisement () {
      if (this.title !== 'add advertisement') {
        this.form = { ...this.advertisement }
        this.oldForm = { ...this.advertisement }
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
          if (this.form[key] !== this.oldForm[key] && key !== 'country' && key !== 'city') {
            formData.append(key, this.form[key])
          }
        }

        formData.append('country_id', this.form.country.id)
        formData.append('city_id', this.form.city.id)

        const payload = { type: 'advertisements', formData }
        let action = 'create'
        // for Updating product
        if (this.title !== 'add advertisement') {
          formData.append('_method', 'patch')
          payload.id = this.product.id
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
    },
    fetchCities (country) {
      this.$store.dispatch('support/fetchCities', { country_id: country ? country.id : '' }).then(() => {})
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
