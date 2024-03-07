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
              {{ $t('links.users') }}
            </h1>
          </div>
          <v-btn class="add-btn" dark @click="handleCreate">
            <span class="btn-text white--text">
              {{ $t("users.create") }}
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
              <v-combobox
                v-model="filters.country"
                :items="countries"
                item-text="name"
                item-value="id"
                :label="$t('products.country')"
                style="max-width: 200px"
                class="me-3 mb-3"
                outlined
                height="44px"
                background-color="#fff"
                dense
                hide-details
                @change="fetchCities"
              />
              <v-combobox
                v-model="filters.city"
                :items="cities"
                item-text="name"
                item-value="id"
                :label="$t('products.city')"
                style="max-width: 200px"
                class="me-3 mb-3"
                outlined
                height="44px"
                background-color="#fff"
                dense
                hide-details
                clearable
                :disabled="!filters.country"
                @change="fetch(1)"
              />
            </div>
          </template>
          <template #[`item.country`]="{ item }">
            <span> {{ item.country.name }} </span>
          </template>
          <template #[`item.city`]="{ item }">
            <span> {{ item.city.name }} </span>
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
                @click="openActivateDialogs(item)"
              />
              <v-btn tile icon @click.stop="handleEdit(item)">
                <v-icon class="mt-6" size="20">
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
    <user-modal :dialog-visible="showModal" :title="modalTitle" :user="modalData" :countries="countries" @closeModal="isModalClosed" />
    <activate-dialog
      :alert-visible="activateItem"
      :item="item"
      @fecthData="fetch()"
      @closeModal="activateItem = false"
    />
  </div>
</template>
<script>
import UserModal from '~/components/users/UserModal.vue'
import ActivateDialog from '~/components/users/ConfirmActivate.vue'
export default {
  name: 'UsersPage',
  components: { UserModal, ActivateDialog },
  data () {
    return {
      perPage: false,
      item: {},
      activateItem: false,
      multiItems: false,
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
          text: this.$t('v.name'),
          sortable: true,
          value: 'full_name'
        },
        {
          text: 'الدولة',
          value: 'country',
          sortable: false
        },
        {
          text: 'المدينة',
          value: 'city',
          sortable: false
        },
        {
          text: this.$t('register.email'),
          value: 'email',
          sortable: false
        },
        {
          text: 'تاريخ الانضمام',
          value: 'created_at',
          sortable: false
        },
        {
          text: 'الحالة',
          value: 'status',
          sortable: false
        },
        { text: '', value: 'actions', sortable: false }
      ],
      options: {}
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/fetchUsersList', {
      type: 'users'
    })
    await store.dispatch('support/fetchCountries', {
      type: 'countries'
    })
  },
  head: {
    title: 'المستخدمون'
  },
  computed: {
    response () {
      return { ...this.$store.state.global.users }
    },
    tableData () {
      // return [...this.response.users]
      const arr = []
      if (this.response.users) {
        this.response.users.forEach((e) => {
          arr.push({ ...e })
        })
      }
      return arr
    },
    countries () {
      return this.$store.state.support.countries
    },
    cities () {
      return this.$store.state.support.cities
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
      this.modalTitle = 'add user'
    },
    handleEdit (item) {
      this.showModal = true
      this.modalTitle = 'edit user'
      this.modalData = { ...item }
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
      this.filters.country_id = this.filters.country ? this.filters.country.id : ''
      this.filters.page = this.perPage
        ? (this.filters.page = 1)
        : this.filters.page
      this.filters.status = this.selectedCategory
        ? this.selectedCategory.value
        : ''
      this.filters.verified = this.verified ? this.verified.value : ''
      this.$store.dispatch('global/fetchUsersList', { type: 'users', ...this.filters }).then(() => {
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
    },
    fetchCities (country) {
      this.fetch()
      this.$store.dispatch('support/fetchCities', { country_id: country ? country.id : '' }).then(() => {})
    }
  }
}
</script>

<style lang="scss">
</style>
