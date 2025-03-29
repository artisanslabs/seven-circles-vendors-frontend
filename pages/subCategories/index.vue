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
              {{ $t('links.subCategories') }}
            </h1>
          </div>
          <v-btn class="add-btn" dark @click="handleCreate">
            <span class="btn-text white--text">
              {{ $t("categories.create") }}
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
    <sub-category-modal :dialog-visible="showModal" :title="modalTitle" :category="modalData" :categories="categories" @closeModal="isModalClosed" />
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
import SubCategoryModal from '~/components/subCategories/SubCategoryModal.vue'
import DeleteAlert from '~/components/shared/DeleteAlert.vue'
import GlobalServices from '~/services/global'
import ActivateDialog from '~/components/subCategories/ConfirmActivate.vue'

export default {
  name: 'SubcategoriesPage',
  components: { SubCategoryModal, DeleteAlert, ActivateDialog },
  data () {
    return {
      perPage: false,
      multiItems: false,
      openDeleteDialog: false,
      item: {},
      activateItem: false,
      showModal: false,
      loading: false,
      modalTitle: '',
      modalData: {},
      filters: {
        search_text: '',
        page: 1,
        orderBy: '',
        sort: 'desc',
        status: '',
        perPage: 10
      },
      headers: [
        {
          text: this.$t('v.name'),
          sortable: true,
          value: 'name'
        },
        {
          text: 'الصنف الرئيسي',
          sortable: false,
          value: 'parent'
        },
        { text: '', value: 'actions', sortable: false }
      ],
      options: {}
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/fetchSubcategoriesList', {
      type: 'sub'
    })

    await store.dispatch('support/fetchCategories', {
      type: 'categories'
    })
  },
  head: {
    title: 'الأصناف الفرعية'
  },
  computed: {
    response () {
      return { ...this.$store.state.global.subcategories }
    },
    tableData () {
      // return [...this.response.subcategories]
      const arr = []
      if (this.response.categories) {
        this.response.categories.forEach((e) => {
          arr.push({ ...e })
        })
      }
      return arr
    },
    categories () {
      return this.$store.state.support.categories
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
      this.modalTitle = 'add subCategory'
    },
    handleEdit (item) {
      this.showModal = true
      this.modalTitle = 'edit subCategory'
      this.modalData = { ...item }
    },
    async handleDelete (payload) {
      if (payload.value) {
        await GlobalServices.delete(this.$axios, { id: this.$route.params.id, item_id: this.deletedItem.id, type: 'subcategories' }).then((resData) => {
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
    fetch (pageNum) {
      this.loading = true
      this.filters.page = pageNum || this.response.current_page
      this.filters.search_text = this.filters.search_text || ''
      this.filters.page = this.perPage
        ? (this.filters.page = 1)
        : this.filters.page
      this.$store.dispatch('global/fetchSubcategoriesList', { type: 'sub', ...this.filters }).then(() => {
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
