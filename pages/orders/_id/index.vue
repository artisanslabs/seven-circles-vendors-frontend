<template>
  <div class="modal">
    <v-row>
      <v-col cols="12" class="facility-card my-10 me-15 ps-16">
        <div class="d-flex justify-space-between flex-wrap">
          <v-breadcrumbs :items="items" />
        </div>
        <v-card class="mt-1">
          <div>
            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('v.name') }} :
                  </p>
                  <p class="span-color">
                    رز بسمتي
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.country') }} :
                  </p>
                  <p class="span-color">
                    السعودية
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.city') }} :
                  </p>
                  <p class="span-color">
                    المدينة المنورة
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.category') }} :
                  </p>
                  <p class="span-color">
                    مواد غذائية
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.unit') }} :
                  </p>
                  <p class="span-color">
                    كيلو
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.price') }} :
                  </p>
                  <p class="span-color">
                    200
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.production_date') }} :
                  </p>
                  <p class="span-color">
                    2022/02/02
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.expiration_date') }} :
                  </p>
                  <p class="span-color">
                    2023/02/02
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.qty') }} :
                  </p>
                  <p class="span-color">
                    20
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex" style="width: 49%">
                  <p class="me-2">
                    {{ $t('products.main_image') }} :
                  </p>
                  <p class="span-color">
                    ...
                  </p>
                </div>
                <div class="d-flex" style="width: 49%">
                  <p class="me-2">
                    {{ $t('products.other_images') }} :
                  </p>
                  <p class="span-color">
                    ...
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.details') }} :
                  </p>
                  <p class="span-color">
                    لا يوجد
                  </p>
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
export default {
  name: 'OrderDetails',
  data () {
    return {
      items: [
        {
          text: this.$t('links.orders'),
          disabled: false
        },
        {
          text: this.$t('orders.order_details'),
          disabled: false
        }
      ]
    }
  },
  methods: {}
}
</script>

  <style lang="scss" scoped>
  </style>
