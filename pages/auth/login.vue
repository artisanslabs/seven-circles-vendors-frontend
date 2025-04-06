<template>
  <v-row>
    <SharedAlert
      :alert-visible="showAlert"
      :data="alertData"
      @closeModal="isAlertClosed"
    />
    <v-col cols="12" class="card-top">
      <v-card class="d-sm-flex d-block mx-auto mt-12 mb-15 auth-card" outlined>
        <v-col cols="6">
          <div class="mt-16 overleck-logo">
            <img
              src="~/assets/images/Logo.png"
              height="140"
              alt="Overleck Logo"
              class="mx-auto avatar"
            />
          </div>
          <div class="d-sm-flex d-none">
            <div class="vertical" />
          </div>
        </v-col>

        <v-col cols="6">
          <div class="px-5 px-sm-10 pb-8 form">
            <h3 class="mt-12 mb-6 title-color">
              {{ $t("v.login_to_control_panel") }}
            </h3>
            <v-form ref="form" lazy-validation>
              <div class="text-start mb-2">
                <span class="black-color label">{{
                  $t("register.email")
                }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.email"
                required
                :placeholder="$t('register.enter_email')"
                outlined
                dense
                type="email"
                :rules="emailRules"
                validate-on-blur
                @keydown.enter="login"
                @blur="() => $refs.form.resetValidation()"
              />
              <div class="text-start mb-2">
                <span class="black-color label">{{
                  $t("register.password")
                }}</span>
                <span class="red-color">{{ $t("v.star") }}</span>
              </div>
              <v-text-field
                v-model="form.password"
                required
                :placeholder="$t('register.enter_password')"
                outlined
                dense
                type="password"
                :rules="passwordRules"
                validate-on-blur
                @keydown.enter="login"
                @blur="() => $refs.form.resetValidation()"
              />
              <v-btn :loading="loading" class="mt-6 login-btn" @click="login">
                {{ $t("register.login") }}
              </v-btn>
            </v-form>
          </div>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
// import GlobalServices from '~/services/global.js'
export default {
  name: "LoginPage",
  layout: "pages",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      emailRules: [
        (v) => !!v || this.$t("v.field_required"),
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || `${this.$t("register.email")} ${this.$t("v.valid")}`,
      ],
      passwordRules: [
        (v) => !!v || this.$t("v.field_required"),
        (v) => v.length >= 6 || this.$t("v.password_length"),
      ],
    };
  },
  head: {
    title: "تسجيل الدخول",
  },
  methods: {
    async login() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        await this.$auth
          .loginWith("local", {
            data: this.form,
          })
          .then((res) => {
            console.log("ddd", res);
            this.setAlertData(res.data);
            // go to Home Page with update data
            this.$router.push(this.localePath({ name: "index" }));
          })
          .catch((e) => {
            this.setAlertData(e.response.data);
          });
        this.loading = false;
      }
    },
    checkEmail(value) {
      if (value.includes("@")) {
        return /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      } else {
        return value;
      }
    },
    isSupported() {
      return (
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.vertical {
  border-left: 1px solid #707070;
  height: 330px;
  position: absolute;
  left: 50%;
  top: 30px;
  opacity: 0.29;
}

.card-top {
  margin-top: 10%;
}

.avatar {
  margin: 35px 0 0 0;
}

.label {
  opacity: 0.73;
  font-size: 13px;
}

@media (max-width: 1440px) {
  .card-top {
    margin-top: 15%;
  }
}

@media (max-width: 768px) {
  .card-top {
    margin-top: 20%;
  }
}

@media (max-width: 600px) {
  .col-6 {
    max-width: 100%;
  }

  .avatar {
    margin: 10px;
  }

  .form {
    margin-top: -50px !important;
  }

  .overleck-logo {
    margin-top: 10px !important;
  }
}
</style>
