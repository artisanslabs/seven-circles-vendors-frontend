export const state = () => ({
  currencies: [],
  products: [],
  vehicles: [],
  categories: [],
  orders: [],
  categoriesList: []
})
export const mutations = {
  CURRENCIES (state, payload) {
    state.currencies = payload
  },
  PRODUCTS (state, payload) {
    state.products = payload
  },
  VEHICLES (state, payload) {
    state.vehicles = payload
  },
  CATEGORIES (state, payload) {
    state.categories = payload
  },
  CATEGORIESLIST (state, payload) {
    state.categoriesList = payload
  },
  ORDERS (state, payload) {
    state.orders = payload
  }
}
export const actions = {
  fetchProducts ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {}).then((response) => {
        commit('PRODUCTS', response.data)
      })
  },
  fetchCurrencies ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {}).then((response) => {
        commit('CURRENCIES', response.data)
      })
  },
  fetchEventTypes ({ commit }) {
    return this.$axios
      .$get('/support/lists/event-types', {}).then((response) => {
        commit('EVENTTYPES', response.data)
      })
  },
  fetchVehicles ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {}).then((response) => {
        commit('VEHICLES', response.data)
      })
  },
  fetchCategories ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {}).then((response) => {
        commit('CATEGORIES', response.data)
      })
  },
  fetchCategoriesList ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/categories/${payload.type}`, {}).then((response) => {
        commit('CATEGORIESLIST', response.data)
      })
  },
  fetchSubCategoriesList ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/categories`, {
        params: {
          parent_id: payload.category_id
        }
      }).then((response) => {
        commit('CATEGORIESLIST', response.data)
      })
  },
  fetchOrders ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {}).then((response) => {
        commit('ORDERS', response.data)
      })
  }
}
