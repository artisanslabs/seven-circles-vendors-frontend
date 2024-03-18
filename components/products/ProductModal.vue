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
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('v.name') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.name"
                placeholder="أدخل اسم المنتج"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
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
            <v-col cols="12" sm="4">
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

            <v-col cols="12" sm="3">
              <div class="text-start mb-2">
                <span>{{ $t('products.category') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-combobox
                v-model="form.category"
                placeholder="اختر الصنف"
                :items="categories"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              />
            </v-col>
            <v-col cols="12" sm="3">
              <div class="text-start mb-2">
                <span>{{ $t('products.unit') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-combobox
                v-model="form.product_unit"
                placeholder="اختر الوحدة"
                :items="units"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              />
            </v-col>
            <v-col cols="6" sm="3">
              <div class="text-start mb-2">
                <span>{{ $t('products.price') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.retail_price"
                hide-spin-buttons
                placeholder="أدخل سعر المنتج"
                type="number"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="6" sm="3">
              <div class="text-start mb-2">
                <span>الوزن</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.weight"
                placeholder="أدخل وزن المنتج"
                type="number"
                hide-spin-buttons
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>

            <v-col cols="12" sm="3">
              <div class="text-start mb-2">
                <span>{{ $t('products.production_date') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>

              <v-menu
                v-model="production_date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.production_date"
                    placeholder="أختر تاريخ الانتاج"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.production_date"
                  locale="ar"
                  @input="production_date = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3">
              <div class="text-start mb-2">
                <span>{{ $t('products.expiration_date') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-menu
                v-model="expiration_date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.expiration_date"
                    placeholder="أختر تاريخ الانتهاء"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.expiration_date"
                  locale="ar"
                  @input="expiration_date = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="3" sm="3">
              <div class="text-start mb-2">
                <span>{{ $t('products.qty') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.quantity"
                placeholder="ادخل كمية المنتج"
                type="number"
                hide-spin-buttons
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="9" sm="3">
              <div class="text-start mb-2">
                <span>العملة</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-combobox
                v-model="form.currency"
                placeholder="اختر العملة"
                :items="currencies"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              />
            </v-col>

            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('products.main_image') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-file-input
                v-model="form.image"
                placeholder="صورة المنتج الرئيسية"
                :rules="[requiredRules]"
                outlined
                dense
                append-icon="mdi-file-image"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('products.other_images') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-file-input
                v-model="images"
                placeholder="صور إضافية للمنتج"
                :rules="[requiredRules]"
                multiple
                outlined
                dense
                append-icon="mdi-folder-multiple-image"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('products.appear_status') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-radio-group
                v-model="form.status"
                row
                class="ms-n4"
              >
                <v-radio
                  color="#0f6d39"
                  :label="$t('products.statuses.appear')"
                  :value="true"
                />
                <v-radio
                  color="#0f6d39"
                  :label="$t('products.statuses.hidden')"
                  :value="false"
                />
              </v-radio-group>
            </v-col>

            <v-col cols="12">
              <div class="text-start mb-2">
                <span>{{ $t('products.details') }}</span>
              </div>
              <v-textarea
                v-model="form.description"
                name="input-7-1"
                placeholder="ادخل تفاصيل المنتج"
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
  name: 'ProductModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'add product'
    },
    product: {
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
    },
    units: {
      type: Object,
      default: () => {
        return {}
      }
    },
    categories: {
      type: Object,
      default: () => {
        return {}
      }
    },
    currencies: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      images: [],
      expiration_date: false,
      production_date: false,
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
      return this.title === 'add product'
        ? 'إضافة منتج'
        : 'تعديل منتج'
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
    product () {
      if (this.title !== 'add product') {
        this.form = { ...this.product }
        this.form.category = this.product.category
        this.form.product_unit = this.product.unit
        this.oldForm = { ...this.product }
        this.oldForm.category = this.product.category
        this.oldForm.product_unit = this.product.unit
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
          if (this.form[key] !== this.oldForm[key] && key !== 'country' && key !== 'product_unit' && key !== 'category' && key !== 'country' && key !== 'city' && key !== 'currency') {
            formData.append(key, this.form[key])
          }
        }

        for (const key in this.images) {
          formData.append(`images[${key}]`, this.images[key])
        }

        formData.append('country_id', this.form.country.id)
        formData.append('product_unit_id', this.form.product_unit.id)
        formData.append('category_id', this.form.category.id)
        formData.append('country_id', this.form.country.id)
        formData.append('city_id', this.form.city.id)
        formData.append('currency_id', this.form.currency.id)
        formData.append('wholesale_price', this.form.retail_price * this.form.quantity)

        const payload = { formData, type: 'products' }
        let action = 'create'
        // for Updating product
        if (this.title !== 'add product') {
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
