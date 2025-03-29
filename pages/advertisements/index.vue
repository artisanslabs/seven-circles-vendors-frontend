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
              {{ $t('links.ads') }}
            </h1>
          </div>
          <v-btn class="add-btn" dark @click="handleCreate">
            <span class="btn-text white--text">
              {{ $t("ads.create") }}
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
          <!-- <template #top>
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
          </template> -->
          <template #[`item.actions`]="{ item }">
            <div>
              <v-btn tile icon @click.stop="handleEdit(item)">
                <v-icon class="mt-2" size="20">
                  mdi-pencil
                </v-icon>
              </v-btn>
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
    <advertisement-modal :dialog-visible="showModal" :title="modalTitle" :advertisement="modalData" @closeModal="isModalClosed" />
  </div>
</template>
<script>
import AdvertisementModal from '~/components/advertisements/AdvertisementModal.vue'
import GlobalServices from '~/services/global'
export default {
  name: 'AdvertisementsPage',
  components: { AdvertisementModal },
  data () {
    return {
      perPage: false,
      showModal: false,
      loading: false,
      modalTitle: '',
      modalData: {},
      filters: {
        search_text: '',
        page: 1,
        orderBy: '',
        sort: 'desc',
        perPage: 10
      },
      headers: [
        {
          text: this.$t('ads.start_date'),
          value: 'starts_at',
          sortable: false
        },
        {
          text: this.$t('ads.end_date'),
          value: 'ends_at',
          sortable: true
        },
        {
          text: this.$t('products.details'),
          value: 'description',
          sortable: true
        },
        { text: '', value: 'actions', sortable: false }
      ],
      options: {}
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/fetchAdvertisementsList', {
      type: 'advertisements'
    })
  },
  head: {
    title: 'الإعلانات'
  },
  computed: {
    response () {
      return { ...this.$store.state.global.advertisements }
    },
    tableData () {
      return [...this.response.advertisements]
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
      this.modalTitle = 'add advertisement'
    },
    handleEdit (item) {
      this.showModal = true
      this.modalTitle = 'edit advertisement'
      this.modalData = { ...item }
    },
    async handleDelete (payload) {
      if (payload.value) {
        await GlobalServices.delete(this.$axios, { id: this.$route.params.id, item_id: this.deletedItem.id, type: 'advertisements' }).then((resData) => {
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
      this.filters.city_id = this.filters.city ? this.filters.city.id : ''
      this.filters.page = this.perPage
        ? (this.filters.page = 1)
        : this.filters.page
      this.filters.status = this.selectedCategory
        ? this.selectedCategory.value
        : ''
      this.filters.verified = this.verified ? this.verified.value : ''
      this.$store.dispatch('global/fetchAdvertisementsList', { type: 'advertisements', ...this.filters }).then(() => {
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
