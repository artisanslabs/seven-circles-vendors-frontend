export const state = () => ({
  list: [],
  customers: [],
  categories: [],
  subcategories: [],
  units: [],
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
});
export const mutations = {
  LIST(state, payload) {
    state.list = payload;
  },
  CUSTOMERS(state, payload) {
    state.customers = payload;
  },
  CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SUBCATEGORIES(state, payload) {
    state.subcategories = payload;
  },
  UNITS(state, payload) {
    state.units = payload;
  },
  PRODUCTS(state, payload) {
    state.products = payload;
  },
  ADVERTISEMENTS(state, payload) {
    state.advertisements = payload;
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
  SUGGESTIONS(state, payload) {
    state.suggestions = payload;
  },
  VENDORS(state, payload) {
    state.vendors = payload;
  },
  BRANDS(state, payload) {
    state.brands = payload;
  },
  DETAILS(state, payload) {
    state.details = payload;
  },
  LOGIN(state, payload) {
    state.login = payload;
  },
};
export const actions = {
  fetchList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
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
      .$get(`/dashboard/${payload.type}`, {
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
  fetchCategoriesList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/categories/${payload.type}`, {
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
        commit("CATEGORIES", response.data);
      })
      .catch((e) => {});
  },
  fetchSubcategoriesList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/categories/${payload.type}`, {
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
        commit("SUBCATEGORIES", response.data);
      })
      .catch((e) => {});
  },
  fetchUnitsList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
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
        commit("UNITS", response.data);
      })
      .catch((e) => {});
  },
  fetchProductsList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          order_by: payload.order_by,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.per_page,
          unit_id: payload.unit_id,
          is_published: payload.status,
          category_id: payload.category_id,
        },
      })
      .then((response) => {
        commit("PRODUCTS", response.data);
      })
      .catch((e) => {});
  },
  fetchAdvertisementsList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
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
      .$get(`/dashboard/${payload.type_value}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage,
          product_id: payload.product_id,
          type: payload.type,
        },
      })
      .then((response) => {
        commit("DISCOUNTS", response.data);
      })
      .catch((e) => {});
  },
  fetchDriversList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
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
      .$get(`/dashboard/${payload.type}`, {
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
      .$get(`/dashboard/${payload.type}`, {
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
      .$get(`/dashboard/${payload.type}`, {
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
      .$get(`/dashboard/${payload.type}`, {
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
  fetchVendorsList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
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
        commit("VENDORS", response.data);
      })
      .catch((e) => {});
  },
  fetchBrandsList({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
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
        commit("BRANDS", response.data);
      })
      .catch((e) => {});
  },
  showDetails({ commit }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}/${payload.id}`)
      .then((response) => {
        commit("DETAILS", response.data);
      })
      .catch((e) => {});
  },
  login({ commit }, payload) {
    return this.$axios
      .$post("/dashboard/accounts/login", payload.formData)
      .then((response) => {
        commit("LOGIN", response.data);
      })
      .catch((e) => {});
  },
};
