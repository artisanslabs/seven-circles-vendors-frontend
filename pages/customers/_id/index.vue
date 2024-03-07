<template>
  <div>
    <v-row>
      <v-col cols="12" class="facility-card mt-10 me-15 ps-16">
        <div class="d-flex sub-title mx-n12">
          <nuxt-link :to="localePath({ name: 'customers' })" class="breadcrumb">
            <h4 class="mt-2 mb-3 breadcrumb">
              {{ $t('links.customers') }}
            </h4>
          </nuxt-link>
          <h4 class="mx-2 mt-1">
            <span>{{ $vuetify.rtl ? '/' : "\\" }}</span>
          </h4>
          <h4 class="mt-2 mb-3">
            {{ customerDetails.full_name }}
          </h4>
        </div>
        <v-card class="card">
          <div>
            <customer-actions />
            <div class="facility__logo">
              <img :src="customerDetails.avatar" alt="logo">
            </div>
            <div class="d-flex align-center details-title">
              <p>{{ $t('customers.details') }} :</p>
            </div>
            <v-row>
              <v-col cols="4">
                <div>
                  <span>اسم العميل :</span>
                  <p>{{ customerDetails.full_name }}</p>
                </div>
                <div>
                  <span>الدولة :</span>
                  <p>{{ customerDetails.full_name }}</p>
                </div>
                <div>
                  <span>المدينة :</span>
                  <p>{{ customerDetails.full_name }}</p>
                </div>
              </v-col>
              <v-col cols="4">
                <div>
                  <span>البريد الالكتروني :</span>
                  <p>{{ customerDetails.email }}</p>
                </div>
                <div>
                  <span>المحل :</span>
                  <p>{{ customerDetails.store_name }}</p>
                </div>
                <div>
                  <span>أقرب معلم بارز :</span>
                  <p>{{ customerDetails.nearest_landmark }}</p>
                </div>
              </v-col>
              <v-col cols="4">
                <div>
                  <span>نوع العمل :</span>
                  <p>{{ customerDetails.work_type }}</p>
                </div>
                <div>
                  <span> رقم الجوال الأول :</span>
                  <p>{{ customerDetails.first_mobile }}</p>
                </div>
                <div>
                  <span> رقم الجوال الثاني :</span>
                  <p>{{ customerDetails.second_mobile }}</p>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CustomerActions from '~/components/customers/CustomerActions.vue'
export default {
  name: 'CustomerDetails',
  components: { CustomerActions },
  async fetch ({ store, params }) {
    await store.dispatch('global/showDetails', { type: 'customers', id: params.id })
  },
  head: {
    title: 'Customer Details'
  },
  computed: {
    customerDetails () {
      return this.$store.state.global.details
    },
    user () {
      return this.$auth.user
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';
.breadcrumb {
  color: #0F6D39;
}
.card {
  position: relative;
  border: solid 1px #dbdbdc;
  background-color: rgba(255, 255, 255, 0.69);
  box-shadow: none !important;
  // min-height: 500px;
  border-radius: 20px;
  & > div {
    padding: 20px;
    padding-inline-start: 140px;
  }
  hr {
    border: 1px solid #dbdbdc;
  }
}
.subscriptions-card {
  @extend .card;
  & > div {
    padding-inline-start: 10px !important;
  }
}
.theme--light.v-data-table {
  background-color: #ffffff00 !important;
}
span {
  font-size: 16px;
  font-weight: 300;
}
p {
  font-size: 16px;
  font-weight: 500;
}

.details-title {
  margin: 15px -20px;
  span {
    width: 12px;
    height: 12px;
    background-color: $main-color;
    border-radius: 50%;
    margin-bottom: -5px;
  }
  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 0.88;
    color: $main-color;
    margin: 0;
    margin-inline-start: 15px;
  }
}

.facility__logo {
  border-radius: 16px;
  border: solid 1px #9ca6ba;
  background-color: #fff;
  height: 158px;
  width: 157px;
  position: absolute;
  top: 52px;
  left: -52px;
  right: auto;
  img {
    padding: 10px;
    height: auto;
    width: 157px;
    max-height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
}

.v-application--is-rtl {
  .facility__logo {
    left: auto;
    right: -52px;
  }
}

@media (max-width: 1200px) {
  .v-card {
    border-radius: 14px;
    & > div {
      padding: 10px;
      padding-inline-start: 80px;
    }
  }
  .facility__logo {
    width: 90px;
    height: 90px;
    border-radius: 12px;
    top: 52px;
    left: -35px;
    img {
      width: 90px;
      padding: 8px;
    }
  }

  .v-application--is-rtl {
    .facility__logo {
      right: -35px;
    }
  }
}
</style>
