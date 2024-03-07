<template>
  <div class="d-flex justify-end update-info align-center">
    <profile-modal :dialog-visible="showModal" :user="modalData" @closeModal="isModalClosed" />
    <v-menu
      offset-y
      transition="slide-y-transition"
      origin="top center"
      style="top: 57px; left: 185px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          color="#0F6D39"
          class="me-n1"
          v-on="on"
        >
          {{ user.full_name }}
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list class="profile-menu">
        <v-list-item @click="handleEdit">
          <v-list-item-title :class="$vuetify.rtl ? '' : 'mr-4'">
            {{ $t("profile.update") }}
          </v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-account-edit</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>{{ $t("profile.logout") }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import GlobalServices from '~/services/global.js'
import ProfileModal from '~/components/shared/ProfileModal.vue'
export default {
  name: 'ProfileMenu',
  components: {
    ProfileModal
  },
  data () {
    return {
      showProfile: false,
      modalData: {},
      showModal: false
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.user
    }
  },
  watch: {
    '$i18n.locale': {
      handler () {
        this.$vuetify.rtl = this.$i18n.locale === 'ar'
        this.setRreferencesLocale()
        const body = document.body
        this.$i18n.locale === 'ar'
          ? body.classList.add('ar')
          : body.classList.remove('ar')
      }
    }
  },
  created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    const body = document.body
    this.$i18n.locale === 'ar'
      ? body.classList.add('ar')
      : body.classList.remove('ar')
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    setRreferencesLocale () {
      GlobalServices.setRreferencesLocale(this.$axios, {
        locale: this.$i18n.locale
      })
    },
    handleEdit () {
      this.showModal = true
      this.modalData = { ...this.user }
    },
    isModalClosed (payload) {
      if (payload.clickedBtn === 'save') {
        this.fetch()
      }
      this.showModal = false
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/_variables.scss';
.profile-menu {
  .v-list-item {
    color: #000000 !important;
    background-color: #fff;
    opacity: 1;
    height: 40px;
    min-height: 40px;
    font-size: 14px;
    .v-list-item__icon {
      margin: 10px 0;
      font-size: 20px;
      .v-icon {
        color: #000000 !important;
        transition: none;
      }
    }
    &:hover {
      color: #fff !important;
      background-color: $main-color;
      opacity: 1;
      .v-icon {
        color: #fff !important;
      }
    }
  }
}
</style>
