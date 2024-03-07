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
              {{ $t('links.suggestions') }}
            </h1>
          </div>
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
          <template #[`item.type`]="{ item }">
            <v-chip
              v-if="item.type == 'suggestion'"
              class="ma-2 px-4"
              color="success"
              outlined
            >
              <v-icon left>
                mdi-checkbox-marked-circle-outline
              </v-icon>
              إقتراح
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
              شكوى
            </v-chip>
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
  </div>
</template>
<script>
export default {
  name: 'SuggestionsPage',
  data () {
    return {
      perPage: false,
      loading: false,
      filters: {
        search_text: '',
        page: 1,
        orderBy: '',
        sort: 'desc',
        perPage: 10
      },
      headers: [
        {
          text: 'المحتوى',
          sortable: false,
          value: 'content'
        },
        {
          text: 'النوع',
          sortable: false,
          value: 'type'
        },
        { text: '', value: 'actions', sortable: false }
      ],
      options: {}
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('global/fetchSuggestionsList', {
      type: 'feedback'
    })
  },
  head: {
    title: 'الشكاوي والمقترحات'
  },
  computed: {
    response () {
      return { ...this.$store.state.global.suggestions }
    },
    tableData () {
      return [...this.response.feedback]
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
    fetch (pageNum) {
      this.loading = true
      this.filters.page = pageNum || this.response.current_page
      this.filters.search_text = this.filters.search_text || ''
      this.filters.page = this.perPage
        ? (this.filters.page = 1)
        : this.filters.page
      this.$store.dispatch('global/fetchSuggestionsList', { type: 'suggestions', ...this.filters }).then(() => {
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
