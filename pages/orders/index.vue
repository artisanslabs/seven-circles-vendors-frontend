<template>
  <div class="list">
    <v-row>
      <v-col
        cols="12"
        class="mt-10"
      >
        <div class="d-flex justify-space-between">
          <div>
            <h1 class="second-font-color">
              {{ $t('links.orders') }}
            </h1>
          </div>
          <!-- <v-btn class="add-btn" dark @click="handleCreate">
            <span class="btn-text white--text">
              {{ $t("cutbacks.create") }}
            </span>
          </v-btn> -->
        </div>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :options.sync="options"
          :headers="headers"
          :items="tableData"
          item-key="id"
          :loading="loading"
          :loader-height="2"
          :items-per-page="30"
          :no-data-text="$t('v.no_data')"
          class="mx-auto mb-5 pa-4 table-style"
          hide-default-footer
          @click:row="show"
        >
          <template #top>
            <div class="d-flex flex-wrap">
              <v-text-field
                v-model="filters.search_text"
                :placeholder="$t('btn.search')"
                dense
                type="text"
                class="table__search me-3 mb-3"
                outlined
                append-icon="mdi-magnify"
                background-color="#fff"
                height="44px"
                hide-details
                clearable
                @input="debounceSearch"
              />
            </div>
          </template>
          <template #[`item.product`]="{ item }">
            <span> {{ item.product }} </span>
          </template>
          <!-- <template #[`item.actions`]="{ item }">
            <div class="d-flex justify-center">
              <v-switch
                v-model="item.status"
                color="#0f6d39"
                inset
                @click.stop="openActivateDialogs(item)"
              />
              <v-btn tile icon @click.stop="handleEdit(item)">
                <v-icon class="mt-6" size="20">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </div>
          </template> -->
        </v-data-table>
        <v-row>
          <v-col cols="6" class="d-flex justify-end">
            <v-pagination
              v-model="response.current_page"
              class="pagination"
              :length="response.last_page"
              :total-visible="5"
              @input="fetch(response.current_page)"
            />
          </v-col>
          <v-col cols="6" class="d-flex justify-start">
            <div class="d-flex justify-center mt-2 pagination-row">
              <small class="font-style">{{ $t('v.no_of_rows') }} : </small>
              <v-select
                v-model="filters.perPage"
                :items="[10, 15, 20, 30]"
                :class="$vuetify.rtl ? 'show-pages' : 'show-pages-en'"
                @change="changePerPage"
              />
              <small class="font-style">{{ tableData.length }} {{ $t('v.of') }}
                {{ response.total }}</small>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <delete-alert
      :alert-visible="openDeleteDialog"
      :multi="multiItems"
      @closeDeleteModal="handleDelete"
    />
    <activate-dialog
      :alert-visible="activateItem"
      :item="item"
      @fecthData="fetch()"
      @closeModal="activateItem = false"
    />
  </div>
</template>
<script>
import DeleteAlert from '~/components/shared/DeleteAlert.vue'
import ActivateDialog from '~/components/discounts/ConfirmActivate.vue'
export default {
  name: 'OrdersPage',
  components: { DeleteAlert, ActivateDialog },
  data () {
    return {
      selectedOrder: '',
      perPage: false,
      item: {},
      activateItem: false,
      openDeleteDialog: false,
      showModal: false,
      loading: false,
      modalTitle: '',
      modalData: {},
      filters: {
        search_text: '',
        page: 1,
        orderBy: '',
        sort: 'desc',
        perPage: 10,
        product_id: '',
        type: ''
      },
      headers: [
        {
          text: this.$t('products.name'),
          sortable: true,
          value: 'product'
        },
        {
          text: 'الخصم',
          value: 'discount_value',
          sortable: false
        },
        {
          text: 'نوع الخصم',
          value: 'discount_type',
          sortable: false
        },
        {
          text: this.$t('cutbacks.date_of_start'),
          value: 'starts_at',
          sortable: false
        },
        {
          text: this.$t('cutbacks.date_of_end'),
          value: 'ends_at',
          sortable: false
        },
        {
          text: 'الحالة',
          value: 'status',
          sortable: false
        },
        { text: '', value: 'actions', sortable: false }
      ],
      options: {},
      discountTypes: [
        {
          text: 'قيمة',
          value: 'amount'
        },
        {
          text: 'نسبة',
          value: 'percentage'
        }
      ]
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/fetchOrdersList', {
      type: 'orders'
    })
  },
  head: {
    title: 'المتطلبات'
  },
  computed: {
    response () {
      return { ...this.$store.state.global.orders }
    },
    tableData () {
      // return [...this.response.products]
      const arr = []
      if (this.response.orders) {
        this.response.orders.forEach((e) => {
          arr.push({ ...e })
        })
      }
      return arr
    },
    orders () {
      return this.$store.state.support.orders
    }
  },
  watch: {
    options: {
      handler () {
        this.sortTable()
      },
      deep: true
    }
  },
  methods: {
    show (item) {
      this.$router.push(
        this.localePath({
          name: 'orders-id',
          params: { id: item.id }
        })
      )
    },
    fetch (pageNum) {
      this.loading = true
      this.filters.page = pageNum || this.response.current_page
      this.filters.search_text = this.filters.search_text || ''
      this.filters.city_id = this.filters.city ? this.filters.city.id : ''
      this.filters.product_id = this.selectedProduct ? this.selectedProduct.id : ''
      this.filters.type = this.selectedDiscountType ? this.selectedDiscountType.value : ''
      this.filters.page = this.perPage
        ? (this.filters.page = 1)
        : this.filters.page
      this.filters.status = this.selectedCategory
        ? this.selectedCategory.value
        : ''
      this.filters.verified = this.verified ? this.verified.value : ''
      this.$store.dispatch('support/fetchOrders', { type: 'orders', ...this.filters }).then(() => {
        this.loading = false
        this.perPage = false
      })
    },
    sortTable () {
      const { sortBy, sortDesc } = this.options
      if (sortBy.length === 1 && sortDesc.length === 1) {
        this.filters.orderBy = sortBy[0]
        this.filters.sort = sortDesc[0] ? 'desc' : 'asc'
        this.fetch()
      }
    },
    changePerPage (val) {
      this.perPage = true
      this.fetch(val)
    },
    openActivateDialogs (item) {
      this.item = item
      this.activateItem = true
    }
  }
}
</script>

<style lang="scss">
</style>
