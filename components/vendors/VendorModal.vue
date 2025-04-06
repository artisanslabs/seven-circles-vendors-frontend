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
            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>الاسم التجاري للشركة</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.name"
                placeholder="اكتب الاسم التجاري للشركة"
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
                <span>البريد الإلكتروني</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.email"
                placeholder="أدخل البريد الإلكتروني"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>شعار الشركة</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-file-input
                v-model="form.logo"
                placeholder="اضف شعار الشركة"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>الموقع الإلكتروني</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.website"
                placeholder="اكتب موقع الإلكتروني للشركة"
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
                <span>مكان الشركة</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.location"
                placeholder="اكتب مكان الشركة"
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
                <span>رقم السجل التجاري</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.commercial_registration_number"
                placeholder="أدخل رقم السجل التجاري"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>ملف السجل التجاري</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-file-input
                v-model="form.commercial_registration_document"
                placeholder="اضف ملف السجل التجاري"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>رقم الحساب المالي</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.financial_account_number"
                placeholder="أدخل رقم الحساب المالي"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>اسم المختص الفني</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.specialist_name"
                placeholder="ادخل اسم المختص الفني"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>رقم المختص</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.specialist_number"
                placeholder="أدخل رقم المختص"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>رقم المختص واتساب</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.specialist_whatsapp_number"
                placeholder="ادخل رقم المختص واتساب"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>العقد الإلكتروني</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-file-input
                v-model="form.contract"
                placeholder="أدخل العقد الإلكتروني"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>اسم المدير</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.director_name"
                placeholder="ادخل اسم المدير"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>رقم المدير واتساب</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.director_whatsapp_number"
                placeholder="ادخل رقم المدير واتساب"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>كلمة المرور</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.password"
                placeholder="أدخل كلمة المرور"
                type="password"
                :rules="[requiredRules, passwordRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-start mb-2">
                <span>تأكيد كلمة المرور</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.password_confirmation"
                placeholder="أدخل تأكيد كلمة المرور"
                type="password"
                :rules="[requiredRules, passwordConfirmRules]"
                validate-on-blur
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" class="modal-btns mt-4 mb-6 d-flex justify-end">
              <v-btn :loading="loading" class="py-6 px-10 mx-2" @click="submit">
                {{ $t("btn.save") }}
              </v-btn>
              <v-btn class="py-6 px-10 cancel-btn" @click="showModal = false">
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
  name: "VendorModal",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "add vendor",
    },
    vendor: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showModal: false,
      clickedBtn: "cancel",
      loading: false,
      form: {
        status: true,
      },
      oldForm: {},
      requiredRules: (v) => !!v || this.$t("v.field_required"),
      passwordRules: [
        (v) => (v ? !!v || this.$t("v.field_required") : ""),
        (v) => (v ? v.length >= 6 || this.$t("v.password_length") : ""),
      ],
      passwordConfirmRules: [
        (v) => (v ? !!v || this.$t("v.field_required") : ""),
        (v) => (v ? v.length >= 6 || this.$t("v.password_length") : ""),
        (v) => (v ? v === this.form.password || this.$t("v.not_match") : ""),
      ],
    };
  },
  computed: {
    pageTitle() {
      return this.title === "add vendor"
        ? this.$t("vendors.create")
        : this.$t("vendors.update");
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
    vendor() {
      if (this.title !== "add vendor") {
        this.form = { ...this.vendor };
        this.oldForm = { ...this.vendor };
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
          if (this.form[key] !== this.oldForm[key]) {
            formData.append(key, this.form[key]);
          }
        }
        const payload = { type: "vendors", formData };

        formData.append("longitude", "180");
        formData.append("latitude", "70");

        let action = "create";
        // for Updating category
        if (this.title !== "add vendor") {
          formData.append("_method", "patch");
          payload.id = this.vendor.id;
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
