export const state = () => ({
  cities: [],
  countries: [],
  currencies: [],
  products: [],
  vehicles: [],
  categories: [],
  orders: []
})
export const mutations = {
  CITIES (state, payload) {
    state.cities = payload
  },
  COUNTRIES (state, payload) {
    state.countries = payload
  },
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
  ORDERS (state, payload) {
    state.orders = payload
  }
}
export const actions = {
  fetchCities ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/countries/${payload.country_id}/cities`, {}).then((response) => {
        commit('CITIES', response.data)
      }).catch((e) => {
        console.log(e)
      })
  },
  fetchCountries ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {}).then((response) => {
        commit('COUNTRIES', response.data)
      })
  },
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
  fetchOrders ({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {}).then((response) => {
        commit('ORDERS', response.data)
      })
  }
}
