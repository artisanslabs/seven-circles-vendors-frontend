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
                    {{ productDetails.name }}
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.country') }} :
                  </p>
                  <p class="span-color">
                    ؟؟؟
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.city') }} :
                  </p>
                  <p class="span-color">
                    ؟؟؟
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.category') }} :
                  </p>
                  <p class="span-color">
                    ؟؟؟
                  </p>
                </div>
                <div />
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.unit') }} :
                  </p>
                  <p class="span-color">
                    ؟؟؟
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.price') }} :
                  </p>
                  <p class="span-color">
                    {{ productDetails.retail_price }}
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.production_date') }} :
                  </p>
                  <p class="span-color">
                    {{ productDetails.production_date }}
                  </p>
                </div>
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.expiration_date') }} :
                  </p>
                  <p class="span-color">
                    {{ productDetails.expiration_date }}
                  </p>
                </div>
                <div />
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex part">
                  <p class="me-2">
                    {{ $t('products.qty') }} :
                  </p>
                  <p class="span-color">
                    {{ productDetails.quantity }}
                  </p>
                </div>
                <div />
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="d-flex justify-space-between flex-wrap">
                <div class="d-flex" style="width: 49%">
                  <p class="me-2">
                    {{ $t('products.main_image') }} :
                  </p>
                  <!-- <p class="span-color"> -->
                  <img :src="productDetails.image[0].image" alt="logo">
                  <!-- </p> -->
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
                <div />
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
  name: 'ProductDetails',
  data () {
    return {
      items: [
        {
          text: this.$t('links.products'),
          disabled: false
        },
        {
          text: this.$t('products.product_details'),
          disabled: false
        }
      ]
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/showDetails', {
      type: 'products',
      id: params.id
    })
  },
  computed: {
    productDetails () {
      return this.$store.state.global.details
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
