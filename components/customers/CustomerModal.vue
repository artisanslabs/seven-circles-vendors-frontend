<template>
  <v-dialog v-model="showModal" max-width="960" persistent>
    <v-card class="text-center px-8 py-4 modal-card">
      <div class="flex-between">
        <h2 class="text-start fs-20 title-color">
          {{ pageTitle }}
        </h2>
        <v-btn icon dark class="close-dialog-icon" @click="showModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("v.name") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.full_name"
                placeholder="أدخل اسم العميل"
                type="text"
                :rules="[requiredRules, minLength, maxLength]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("register.email") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.email"
                placeholder="أدخل البريد الإلكتروني"
                type="text"
                :rules="[requiredRules, maxLength]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("gender.gender") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-radio-group v-model="form.gender" row class="ms-n4">
                <v-radio
                  color="#0f6d39"
                  :label="$t('gender.male')"
                  :value="'male'"
                />
                <v-radio
                  color="#0f6d39"
                  :label="$t('gender.female')"
                  :value="'female'"
                />
              </v-radio-group>
            </v-col>
            <v-col v-if="!editCustomer" cols="12" sm="4">
              <div class="text-start mb-2">
                <span>كلمة المرور</span>
                <span class="red-color">{{ $t("v.star") }}</span>
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
                <span class="red-color">{{ $t("v.star") }}</span>
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
                <span>{{ $t("customers.store") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.store_name"
                placeholder="اكتب اسم المحل"
                type="text"
                :rules="[requiredRules, minLength, maxLength]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("customers.nearest_landmark") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.nearest_landmark"
                placeholder="اكتب أقرب معلم بارز"
                type="text"
                :rules="[requiredRules, maxLength]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("customers.work_type") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.work_type"
                placeholder="اكتب نوع عمل المحل"
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
                <span>{{ $t("customers.first_phone") }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.first_mobile"
                placeholder="اكتب الرقم الأول"
                type="number"
                :rules="[requiredRules, maxLength]"
                validate-on-blur
                hide-spin-buttons
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("customers.second_phone") }}</span>
              </div>
              <v-text-field
                v-model="form.second_mobile"
                placeholder="اكتب الرقم الثاني"
                type="number"
                outlined
                hide-spin-buttons
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t("customers.thired_phone") }}</span>
              </div>
              <v-text-field
                v-model="form.thired_mobile"
                placeholder="اكتب الرقم الثالث"
                type="number"
                outlined
                hide-spin-buttons
                dense
                required
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

            <v-col cols="12" sm="4">
              <v-card>
                <v-img
                  v-if="form.avatar"
                  :src="imageUrl"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-if="form.full_name">
                    صورة {{ form.full_name }}
                  </v-card-title>
                </v-img>
              </v-card>
            </v-col>

            <v-col cols="12" class="modal-btns mt-4 mb-6 d-flex justify-end">
              <v-btn :loading="loading" class="py-5 px-10 mx-2" @click="submit">
                {{ $t("btn.save") }}
              </v-btn>
              <v-btn class="py-5 px-10 cancel-btn" @click="showModal = false">
                {{ $t("btn.cancel") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import GlobalServices from "~/services/global.js";
export default {
  name: "CustomerModal",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "add customer",
    },
    customer: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      selectedImage: null,
      imageUrl: null,

      showModal: false,
      passwordStatus: false,
      clickedBtn: "cancel",
      loading: false,
      form: {
        password: "",
        password_confirmation: "",
      },
      oldForm: {
        password: "",
        password_confirmation: "",
      },
      requiredRules: (v) => !!v || this.$t("v.field_required"),
      minLength: (v) =>
        v ? v.length >= 3 || this.$t("v.text_min_length") : "",
      maxLength: (v) =>
        v ? v.length <= 255 || this.$t("v.text_max_length") : "",
      emailRules: [
        (v) => !!v || this.$t("v.field_required"),
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || `${this.$t("register.email")} ${this.$t("v.valid")}`,
      ],
      passwordRules: [
        (v) => (v ? !!v || this.$t("v.field_required") : ""),
        (v) => (v ? v.length >= 6 || this.$t("v.password_length") : ""),
      ],
      passwordConfirmRules: [
        (v) => (v ? !!v || this.$t("v.field_required") : ""),
        (v) => (v ? v.length >= 6 || this.$t("v.password_length") : ""),
        (v) => (v ? v === this.form.password || this.$t("v.not_match") : ""),
      ],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
    };
  },
  computed: {
    pageTitle() {
      return this.title === "add customer"
        ? this.$t("customers.create")
        : this.$t("customers.update");
    },
    editCustomer() {
      return this.title !== "add customer";
    },
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible === true) {
        this.showModal = true;
      }
    },
    showModal() {
      if (this.showModal === false) {
        this.$emit("closeModal", { value: true, clickedBtn: this.clickedBtn });
        this.resetForm();
      }
    },
    customer() {
      if (this.title !== "add customer") {
        this.form = { ...this.customer };
        this.oldForm = { ...this.customer };
      }
    },
  },
  methods: {
    async submit() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        const formData = new FormData();
        for (const key in this.form) {
          if (
            this.form[key] !== this.oldForm[key] &&
            key !== "password" &&
            key !== "password_confirmation"
          ) {
            formData.append(key, this.form[key]);
          }
        }

        // formData.append("longitude", "180");
        // formData.append("latitude", "70");

        if (this.title === "add customer") {
          formData.append("password", this.form.password);
          formData.append(
            "password_confirmation",
            this.form.password_confirmation
          );
        }
        const payload = { type: "customers", formData };
        let action = "create";
        // for Updating customer
        if (this.title !== "add customer") {
          formData.append("_method", "patch");
          payload.id = this.customer.id;
          action = "update";
        }

        await GlobalServices[action](this.$axios, payload).then((resData) => {
          this.setAlertDataGlobal(resData);
          if (resData.success) {
            this.clickedBtn = "save";
            this.showModal = false;
          }
        });
        this.loading = false;
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.form = {};
    },
    onFileChange(event) {
      // console.log(event)
      // const file = event.target.files[0]
      if (event) {
        this.form.avatar = event;
        this.imageUrl = URL.createObjectURL(event);
      }
    },
  },
};
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
