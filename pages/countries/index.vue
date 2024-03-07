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
              {{ $t('links.countries') }}
            </h1>
          </div>
          <!-- <v-btn class="add-btn" dark @click="handleCreate">
            <span class="btn-text white--text">
              {{ $t("countries.create") }}
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
        >
          <template #top>
            <div class="d-flex flex-wrap">
              <v-text-field
                v-model="filters.search_text"
                :placeholder="$t('btn.search')"
                class="table__search me-3 mb-3"
                dense
                type="text"
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
          <!-- <template #[`item.actions`]="{ item }">
            <div>
              <v-btn tile icon @click.stop="handleEdit(item)">
                <v-icon class="mt-2" size="20">
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn tile icon @click.stop="openDeleteDialogs(item)">
                <v-icon size="20">
                  mdi-delete
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
    <country-modal :dialog-visible="showModal" :title="modalTitle" :country="modalData" @closeModal="isModalClosed" />
    <delete-alert
      :alert-visible="openDeleteDialog"
      :multi="multiItems"
      @closeDeleteModal="handleDelete"
    />
  </div>
</template>
<script>
import CountryModal from '~/components/countries/CountryModal.vue'
import DeleteAlert from '~/components/shared/DeleteAlert.vue'
import GlobalServices from '~/services/global'
export default {
  name: 'CountriesPage',
  components: { CountryModal, DeleteAlert },
  data () {
    return {
      perPage: false,
      multiItems: false,
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
        status: '',
        perPage: 10
      },
      response2: {
        current_page: 1,
        last_page: 12
      },
      headers: [
        {
          text: this.$t('v.name'),
          sortable: true,
          value: 'name'
        },
        { text: '', value: 'actions', sortable: false }
      ],
      options: {}
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/fetchCountriesList', {
      type: 'countries'
    })
  },
  head: {
    title: 'الدول'
  },
  computed: {
    response () {
      return { ...this.$store.state.global.countries }
    },
    tableData () {
      return [...this.response.countries]
    },
    cities () {
      return this.$store.state.list
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
      this.modalTitle = 'add country'
    },
    handleEdit (item) {
      this.showModal = true
      this.modalTitle = 'edit country'
      this.modalData = { ...item }
    },
    async handleDelete (payload) {
      if (payload.value) {
        await GlobalServices.delete(this.$axios, { id: this.$route.params.id, item_id: this.deletedItem.id, type: 'countries' }).then((resData) => {
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
      this.$store.dispatch('global/fetchCountriesList', { type: 'countries', ...this.filters }).then(() => {
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
    }
  }
}
</script>

<style lang="scss">
</style>
