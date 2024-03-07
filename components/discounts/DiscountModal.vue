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
                <span>{{ $t('products.name') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-combobox
                v-model="form.product"
                placeholder="اختر المنتج"
                :items="products"
                item-text="name"
                item-value="id"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              />
            </v-col>
            <v-col cols="6" sm="4">
              <div class="text-start mb-2">
                <span>نوع الخصم</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-combobox
                v-model="form.discount_type"
                placeholder="اختر نوع الخصم"
                :items="discountTypes"
                item-text="text"
                item-value="value"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                clearable
              />
            </v-col>
            <v-col cols="6" sm="4">
              <div class="text-start mb-2">
                <span>الخصم</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-text-field
                v-model="form.discount_value"
                :disabled="!form.discount_type"
                :placeholder="!form.discount_type ? 'اختر نوع الخصم اولاً' : (form.discount_type.value == 'amount' ? 'أدخل قيمة الخصم' : 'أدخل نسبة الخصم')"
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
                <span>{{ $t('cutbacks.date_of_start') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
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
                    placeholder="أختر تاريخ بداية التخفيض"
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
                <span>{{ $t('cutbacks.date_of_end') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
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
                    placeholder="أختر تاريخ نهاية التخفيض"
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
  name: 'DiscountModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'add discount'
    },
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    products: {
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
      starts_at: false,
      ends_at: false,
      form: {},
      oldForm: {},
      discountTypes: [
        {
          text: this.$t('discounts.amount'),
          value: 'amount'
        },
        {
          text: this.$t('discounts.percentage'),
          value: 'percentage'
        }
      ],
      requiredRules: v => !!v || this.$t('v.field_required'),
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false
    }
  },
  computed: {
    pageTitle () {
      return this.title === 'add discount'
        ? this.$t('cutbacks.create')
        : this.$t('cutbacks.update')
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
    product () {
      if (this.title !== 'add discount') {
        this.form = { ...this.product }
        this.oldForm = { ...this.product }
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
          if (this.form[key] !== this.oldForm[key] && key !== 'product' && key !== 'discount_type') {
            formData.append(key, this.form[key])
          }
        }
        formData.append('product_id', this.form.product.id)
        formData.append('discount_type', this.form.discount_type.value)

        const payload = { type: 'discounts', formData }
        let action = 'create'
        // for Updating product
        if (this.title !== 'add discount') {
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
