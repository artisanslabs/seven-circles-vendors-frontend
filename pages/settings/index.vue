<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col cols="12" class="text-center mt-10">
          <v-card elevation="2" shaped tile class="pa-4">
            <div class="d-flex justify-space-between">
              <div>
                <h2 class="second-font-color">
                  {{ $t("links.settings") }}
                </h2>
              </div>
              <v-btn
                class="add-btn"
                :loading="loading"
                dark
                @click="handleUpdate"
              >
                <span class="btn-text white--text">
                  {{ $t("v.update") }}
                </span>
              </v-btn>
            </div>
            <v-row>
              <v-col cols="12" sm="4">
                <div class="text-start mb-2">
                  <span>{{ $t("settings.name") }}</span>
                  <span class="red-color">{{ $t("v.star") }}</span>
                </div>
                <v-text-field
                  v-model="form.name"
                  placeholder="اكتب اسم الشركة"
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
                  <span>اسم المدير</span>
                  <span class="red-color">{{ $t("v.star") }}</span>
                </div>
                <v-text-field
                  v-model="form.director_name"
                  placeholder="اكتب اسم المدير"
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
                  <span>رقم المدير واتساب</span>
                </div>
                <v-text-field
                  v-model="form.director_whatsapp_number"
                  placeholder="اكتب رقم المدير واتساب"
                  type="text"
                  validate-on-blur
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-start mb-2">
                  <span>اسم المختص</span>
                  <span class="red-color">{{ $t("v.star") }}</span>
                </div>
                <v-text-field
                  v-model="form.specialist_name"
                  placeholder="اكتب اسم الشركة"
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
                  <span>رقم المختص</span>
                  <span class="red-color">{{ $t("v.star") }}</span>
                </div>
                <v-text-field
                  v-model="form.specialist_number"
                  placeholder="اكتب رقم المختص"
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
                  <span>رقم المختص واتساب</span>
                </div>
                <v-text-field
                  v-model="form.specialist_whatsapp_number"
                  placeholder="اكتب رقم المختص واتساب"
                  type="text"
                  validate-on-blur
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-start mb-2">
                  <span>رقم الحساب المالي</span>
                  <span class="red-color">{{ $t("v.star") }}</span>
                </div>
                <v-text-field
                  v-model="form.financial_account_number"
                  placeholder="اكتب رقم الحساب المالي"
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
                  <span>{{ $t("settings.telphone") }}</span>
                </div>
                <v-text-field
                  v-model="form.telphone"
                  placeholder="اكتب تلفون الشركة"
                  type="text"
                  validate-on-blur
                  outlined
                  dense
                  required
                />
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-start mb-2">
                  <span>{{ $t("settings.logo") }}</span>
                </div>
                <v-file-input
                  v-model="form.logo"
                  placeholder="شعار الشركة"
                  outlined
                  dense
                  append-icon="mdi-file-image"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-start mb-2">
                  <span>{{ $t("settings.website") }}</span>
                  <span class="red-color">{{ $t("v.star") }}</span>
                </div>
                <v-text-field
                  v-model="form.website"
                  placeholder="اكتب موقع الشركة"
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
                  <span>البريد الإلكتروني</span>
                  <span class="red-color">{{ $t("v.star") }}</span>
                </div>
                <v-text-field
                  v-model="form.email"
                  placeholder="اكتب البريد الإلكتروني"
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
                  <span>رقم السجل التجاري</span>
                </div>
                <v-text-field
                  v-model="form.commercial_registration_number"
                  placeholder="اكتب رقم السجل التجاري"
                  type="text"
                  validate-on-blur
                  outlined
                  dense
                  required
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import GlobalServices from "~/services/global.js";

export default {
  name: "SettingsPage",
  data() {
    return {
      loading: false,
      form: {},
      oldForm: {},
      requiredRules: (v) => !!v || this.$t("v.field_required"),
    };
  },
  async fetch() {
    await this.$store.dispatch("global/fetchProfile", {
      type: "profile",
    });
  },
  head: {
    title: "الإعدادات",
  },
  computed: {
    profile() {
      return this.$store.state.global.profile;
    },
  },
  watch: {
    profile: {
      immediate: true,
      handler(newProfile) {
        if (newProfile) {
          // Create a deep copy of the profile to avoid mutating the store
          const profileCopy = JSON.parse(JSON.stringify(newProfile));
          this.form = { ...profileCopy };
          this.oldForm = { ...profileCopy };
        }
      },
    },
  },
  methods: {
    async handleUpdate() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        const formData = new FormData();

        // Only append changed fields
        for (const key in this.form) {
          if (this.form[key] !== this.oldForm[key]) {
            formData.append(key, this.form[key]);
          }
        }

        const payload = { formData, type: "profile" };
        // formData.append("_method", "patch");
        const action = "update";

        await GlobalServices[action](this.$axios, payload).then((resData) => {
          this.setAlertDataGlobal(resData);
        });
        this.loading = false;
      }
    },
  },
};
</script>
