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
                v-model="form.full_name"
                placeholder="أدخل اسم المستخدم"
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
                <span>{{ $t('register.email') }}</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.email"
                placeholder="أدخل البريد الالكتروني"
                type="email"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('profile.mobile') }}</span>
              </div>
              <v-text-field
                v-model="form.mobile"
                placeholder="اكتب رقم الجوال"
                type="number"
                outlined
                hide-spin-buttons
                dense
                required
              />
            </v-col>
            <v-col v-if="!editCustomer" cols="12" sm="4">
              <div class="text-start mb-2">
                <span>كلمة المرور</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.password"
                placeholder="أدخل كلمة المرور"
                type="password"
                :rules="passwordRules"
                validate-on-blur
                outlined
                dense
              />
            </v-col>
            <v-col v-if="!editCustomer" cols="12" sm="4">
              <div class="text-start mb-2">
                <span>تأكيد كلمة المرور</span>
                <span class="red-color">{{ $t('v.star') }}</span>
              </div>
              <v-text-field
                v-model="form.password_confirmation"
                placeholder="أدخل تأكيد كلمة المرور"
                type="password"
                :rules="passwordConfirmRules"
                validate-on-blur
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الصورة</span>
              </div>
              <v-file-input
                v-model="form.avatar"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="اختر الصورة"
                prepend-icon=""
                outlined
                dense
                @change="onFileChange"
              />
            </v-col>
            <!-- <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>الحالة</span>
              </div>
              <v-radio-group
                v-model="form.status"
                row
                class="ms-n4"
              >
                <v-radio
                  label="مفعل"
                  :value="true"
                />
                <v-radio
                  label="غير مفعل"
                  :value="false"
                />
              </v-radio-group>
            </v-col> -->

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
  name: 'UserModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'add user'
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
      showModal: false,
      passwordStatus: false,
      clickedBtn: 'cancel',
      loading: false,
      form: {},
      oldForm: {},
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      requiredRules: v => !!v || this.$t('v.field_required'),
      emailRules: [
        v => !!v || this.$t('v.field_required'),
        v =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || `${this.$t('register.email')} ${this.$t('v.valid')}`
      ],
      passwordRules: [
        v => v ? !!v || this.$t('v.field_required') : '',
        v => v ? v.length >= 6 || this.$t('v.password_length') : ''
      ],
      passwordConfirmRules: [
        v => v ? !!v || this.$t('v.field_required') : '',
        v => v ? v.length >= 6 || this.$t('v.password_length') : '',
        v => v ? v === this.form.password || this.$t('v.not_match') : ''
      ]
    }
  },
  computed: {
    pageTitle () {
      return this.title === 'add user'
        ? this.$t('users.create')
        : this.$t('users.update')
    },
    cities () {
      return this.$store.state.support.cities
    },
    editCustomer () {
      return this.title !== 'add user'
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
      if (this.title !== 'add user') {
        this.form = { ...this.user }
        this.oldForm = { ...this.user }
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

        if (this.title === 'add user') {
          formData.append('password', this.form.password)
          formData.append('password_confirmation', this.form.password_confirmation)
        }

        const payload = { type: 'users', formData }
        let action = 'create'
        // for Updating user
        if (this.title !== 'add user') {
          formData.append('_method', 'patch')
          payload.id = this.user.id
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
      this.form = {}
    },
    onFileChange (event) {
      if (event) {
        this.form.avatar = event
        this.imageUrl = URL.createObjectURL(event)
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
