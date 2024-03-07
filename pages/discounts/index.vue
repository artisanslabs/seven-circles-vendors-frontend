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
              {{ $t('links.cutbacks') }}
            </h1>
          </div>
          <v-btn class="add-btn" dark @click="handleCreate">
            <span class="btn-text white--text">
              {{ $t("cutbacks.create") }}
            </span>
          </v-btn>
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
              <v-combobox
                v-model="selectedProduct"
                :items="products"
                item-text="name"
                item-value="id"
                label="اختر المنتج"
                style="max-width: 185px"
                class="me-4 mb-2"
                outlined
                height="44px"
                background-color="#fff"
                dense
                hide-details
                clearable
                @change="fetch(1)"
              />
              <v-combobox
                v-model="selectedDiscountType"
                :items="discountTypes"
                item-text="text"
                item-value="value"
                label="اختر نوع الخصم"
                style="max-width: 185px"
                class="me-4 mb-2"
                outlined
                height="44px"
                background-color="#fff"
                dense
                hide-details
                clearable
                @change="fetch(1)"
              />
            </div>
          </template>
          <template #[`item.product`]="{ item }">
            <span> {{ item.product.name }} </span>
          </template>
          <template #[`item.discount_type`]="{ item }">
            <span v-if="item.discount_type == 'amount'"> قيمة </span>
            <span v-else> نسبة </span>
          </template>
          <template #[`item.discount_value`]="{ item }">
            <span v-if="item.discount_type == 'amount'"> {{ item.discount_value }} ريال</span>
            <span v-else> {{ item.discount_value }} %</span>
          </template>
          <template #[`item.status`]="{ item }">
            <v-chip
              v-if="item.status"
              class="ma-2"
              color="success"
              outlined
            >
              <v-icon left>
                mdi-checkbox-marked-circle-outline
              </v-icon>
              مفعل
            </v-chip>
            <v-chip
              v-else
              class="ma-2"
              color="error"
              outlined
            >
              <v-icon left>
                mdi-alert-circle-outline
              </v-icon>
              غير مفعل
            </v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
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
              <!-- <v-btn tile icon @click.stop="openDeleteDialogs(item)">
                <v-icon class="mt-6" size="20">
                  mdi-delete
                </v-icon>
              </v-btn> -->
            </div>
          </template>
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
    <discount-modal :dialog-visible="showModal" :title="modalTitle" :product="modalData" :products="products" @closeModal="isModalClosed" />
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
import DiscountModal from '~/components/discounts/DiscountModal.vue'
import DeleteAlert from '~/components/shared/DeleteAlert.vue'
import GlobalServices from '~/services/global'
import ActivateDialog from '~/components/discounts/ConfirmActivate.vue'
export default {
  name: 'DiscountsPage',
  components: { DiscountModal, DeleteAlert, ActivateDialog },
  data () {
    return {
      selectedProduct: '',
      selectedDiscountType: '',
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
    await store.dispatch('global/fetchDiscountsList', {
      type_value: 'discounts'
    })
    await store.dispatch('support/fetchProducts', {
      type: 'products'
    })
  },
  head: {
    title: 'التخفيضات'
  },
  computed: {
    response () {
      return { ...this.$store.state.global.discounts }
    },
    tableData () {
      // return [...this.response.products]
      const arr = []
      if (this.response.discounts) {
        this.response.discounts.forEach((e) => {
          arr.push({ ...e })
        })
      }
      return arr
    },
    products () {
      return this.$store.state.support.products
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
    handleCreate () {
      this.showModal = true
      this.modalTitle = 'add discount'
    },
    handleEdit (item) {
      this.showModal = true
      this.modalTitle = 'edit discount'
      this.modalData = { ...item }
    },
    async handleDelete (payload) {
      if (payload.value) {
        await GlobalServices.delete(this.$axios, { id: this.$route.params.id, item_id: this.deletedItem.id, type: 'discounts' }).then((resData) => {
          if (resData.success) {
            this.fetch()
          }
          this.openDeleteDialog = false
          this.setAlertDataGlobal(resData)
        })
      } else {
        this.openDeleteDialog = false
      }
    },
    openDeleteDialogs (item = -1) {
      this.multiItems = true
      if (item !== -1) {
        this.multiItems = false
        this.deletedItem = item
        this.selectedItems = []
      }
      this.openDeleteDialog = true
    },
    isModalClosed (payload) {
      if (payload.clickedBtn === 'save') {
        this.fetch()
      }
      this.showModal = false
    },
    show (item) {
      this.$router.push(
        this.localePath({
          name: 'discounts-id',
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
      this.$store.dispatch('global/fetchDiscountsList', { type_value: 'discounts', ...this.filters }).then(() => {
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
