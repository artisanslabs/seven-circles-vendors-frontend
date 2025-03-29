<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      mini-variant-width="269"
      permanent
      class="nav"
    >
      <v-list-item class="px-2 mt-6 mb-2 d-block">
        <div class="ma-2">
          <div class="text-center mt-10 mb-4">
            <img
              width="100%"
              height="100%"
              src="~/assets/images/Logo.png"
            >

            <!-- <h5 class="mt-4 black--text">
              أحمد عبدالرحمن العتيبي
            </h5> -->
          </div>
        </div>

        <hr class="mt-10">
      </v-list-item>

      <v-list class="navbar">
        <v-list-item nuxt :to="localePath({ name: 'index' })" exact>
          <v-list-item-icon>
            <v-icon class="mr-1 mt-n4" size="20">
              mdi-view-dashboard
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.dashboard") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'products' })">
          <v-list-item-icon>
            <v-icon class="mr-1 mt-n4" size="20">
              mdi-flower
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.products") }}
          </v-list-item-title>
        </v-list-item>

        <!-- <v-list-item nuxt :to="localePath({ name: 'discounts' })">
          <v-list-item-icon>
            <v-icon class="mr-1 mt-n4" size="20">
              mdi-arrow-bottom-right mdi-account-multiple
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.cutbacks") }}
          </v-list-item-title>
        </v-list-item> -->

        <v-list-item nuxt :to="localePath({ name: 'customers' })">
          <v-list-item-icon>
            <v-icon class="mr-1 mt-n4" size="20">
              mdi-account-multiple
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.customers") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'orders' })">
          <v-list-item-icon>
            <v-icon class="mr-1 mt-n4" size="20">
              mdi-clipboard-text
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.orders") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'advertisements' })">
          <v-list-item-icon>
            <v-icon class="mr-1 mt-n4" size="20">
              mdi-image-multiple
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.ads") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'users' })">
          <v-list-item-icon>
            <v-icon class="mr-1 mt-n4" size="20">
              mdi-account-multiple
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.users") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'categories' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-view-grid
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.categories") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'subCategories' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-view-grid-compact
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.subCategories") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'vendors' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-account-tie
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.vendors") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'brands' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-star-check
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.brands") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'units' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-cards
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.units") }}
          </v-list-item-title>
        </v-list-item>

        <!-- <v-list-item nuxt :to="localePath({ name: 'drivers' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-steering
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.drivers") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'vehicles' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-truck
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.vehicles") }}
          </v-list-item-title>
        </v-list-item> -->

        <v-list-item nuxt :to="localePath({ name: 'suggestions' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-checkbox-multiple-marked-circle-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.suggestions") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item nuxt :to="localePath({ name: 'settings' })">
          <v-list-item-icon>
            <v-icon class="mt-n4" size="20">
              mdi-power-settings
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("links.settings") }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      mini: true
    }
  },
  computed: {},
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  min-height: 100vh !important;
  background-color: #f2f2f2;
  width: 300px !important;
  .v-navigation-drawer__content {
    .v-list-item {
      height: 45px;
      margin-block: 10px !important;
      color: #9ca6ba;
      justify-content: unset !important;
      .v-icon {
        color: #9ca6ba;
        border-radius: 10px;
        padding: 15px 5px;
      }
      .v-list-item__title {
        font-weight: 700 !important;
        font-size: 16px;
      }
    }
    .v-list-item--active {
      color: #000000 !important;
      border-inline-end: 8px solid #0F6D39;
      background-color: #ffffff;
      .v-icon {
        color: #d28041 !important
      }
    }
  }

  .v-list-item--link:before {
    background-color: #ffffff !important;
  }

  .log-out {
    margin-inline-start: 50px;
    bottom: -60px;
    border-radius: 8px;
    border: 1px solid #ed4266;
    height: 38px;
    .text {
      margin-bottom: 5px;
      color: #ed4266;
    }
    .icon {
      color: #ed4266;
      font-size: 20px;
      margin: -5px;
      margin-top: 3px;
    }
  }

  .log-out:hover {
    margin-inline-start: 50px;
    background: #ed4266;
    bottom: -60px;
    border-radius: 8px;
    height: 38px;
    .text {
      margin-bottom: 5px;
      color: #ffffff;
    }
    .icon {
      color: #ffffff;
    }
  }
}

.navbar {
  margin-top: 100px;
}
</style>
