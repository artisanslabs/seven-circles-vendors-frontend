export const state = () => ({
  list: [],
  customers: [],
  categories: [],
  subcategories: [],
  units: [],
  brands: [],
  products: [],
  advertisements: [],
  discounts: [],
  drivers: [],
  orders: [],
  users: [],
  markets: [],
  suggestions: [],
  vendors: [],
  brands: [],
  details: {},
  login: {},
  profile: {},
});
export const mutations = {
  LIST(state, payload) {
    state.list = payload
  },
  CUSTOMERS(state, payload) {
    state.customers = payload;
  },
  CATEGORIES (state, payload) {
    state.categories = payload
  },
  SUBCATEGORIES (state, payload) {
    state.subcategories = payload
  },
  UNITS (state, payload) {
    state.units = payload
  },
  BRANDS (state, payload) {
    state.brands = payload
  },
  PRODUCTS (state, payload) {
    state.products = payload
  },
  DISCOUNTS(state, payload) {
    state.discounts = payload;
  },
  DRIVERS(state, payload) {
    state.drivers = payload;
  },
  ORDERS(state, payload) {
    state.orders = payload;
  },
  USERS(state, payload) {
    state.users = payload;
  },
  MARKETS(state, payload) {
    state.markets = payload;
  },
  VENDORS(state, payload) {
    state.vendors = payload;
  },
  LOGIN (state, payload) {
    state.login = payload
  },
  PROFILE (state, payload) {
    state.profile = payload
  },
}
export const actions = {
  fetchList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("LIST", response.data);
      })
      .catch((e) => {});
  },
  fetchCustomersList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("CUSTOMERS", response.data);
      })
      .catch((e) => {});
  },
  fetchCategoriesList ({
    commit
  }, payload) {
    return this.$axios
      .$get(`/vendors/categories/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage
        }
      }).then((response) => {
        commit('CATEGORIES', response.data)
      }).catch((e) => {})
  },
  fetchSubcategoriesList ({
    commit
  }, payload) {
    return this.$axios
      .$get(`/vendors/categories/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage
        }
      }).then((response) => {
        commit('SUBCATEGORIES', response.data)
      }).catch((e) => {})
  },
  fetchUnitsList ({
    commit
  }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage
        }
      }).then((response) => {
        commit('UNITS', response.data)
      }).catch((e) => {})
  },
  fetchBrandsList ({
    commit
  }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          order_by: payload.order_by,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage
        }
      }).then((response) => {
        commit('BRANDS', response.data)
      }).catch((e) => {})
  },
  fetchAdvertisementsList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("ADVERTISEMENTS", response.data);
      })
      .catch((e) => {});
  },
  fetchDiscountsList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("DRIVERS", response.data);
      })
      .catch((e) => {});
  },
  fetchOrdersList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type_value}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("ORDERS", response.data);
      })
      .catch((e) => {});
  },
  fetchUsersList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          city_id: payload.city_id,
          country_id: payload.country_id,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("USERS", response.data);
      })
      .catch((e) => {});
  },
  fetchMarketsList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("MARKETS", response.data);
      })
      .catch((e) => {});
  },
  fetchSuggestionsList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("SUGGESTIONS", response.data);
      })
      .catch((e) => {});
  },
  showDetails({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}/${payload.id}`).then((response) => {
        commit('DETAILS', response.data)
      }).catch((e) => {})
  },
  login({ commit }, payload) {
    return this.$axios
      .$post('/vendorss/accounts/login', payload.formData).then((response) => {
        commit('LOGIN', response.data)
      }).catch((e) => {})
  },
  fetchProfile ({
    commit
  }, payload) {
    return this.$axios
      .$get(`/vendors/accounts/${payload.type}`).then((response) => {
        commit("PROFILE", response.data);
      })
      .catch((e) => {});
  },
  fetchProductsList({ commit }, payload) {
    return this.$axios
      .$get(`/vendors/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          per_page: payload.perPage,
        },
      })
      .then((response) => {
        commit("PRODUCTS", response.data);
      })
      .catch((e) => {});
  },
};
