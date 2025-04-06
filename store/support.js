export const state = () => ({
  currencies: [],
  products: [],
  vehicles: [],
  categories: [],
  orders: [],
  categoriesList: [],
  units: [],
  brands: [],
});
export const mutations = {
  CURRENCIES(state, payload) {
    state.currencies = payload;
  },
  PRODUCTS(state, payload) {
    state.products = payload;
  },
  VEHICLES(state, payload) {
    state.vehicles = payload;
  },
  CATEGORIES(state, payload) {
    state.categories = payload;
  },
  CATEGORIESLIST(state, payload) {
    state.categoriesList = payload;
  },
  UNITS(state, payload) {
    state.units = payload;
  },
  ORDERS(state, payload) {
    state.orders = payload;
  },
  BRANDS(state, payload) {
    state.brands = payload;
  },
};
export const actions = {
  fetchProducts({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {})
      .then((response) => {
        commit("PRODUCTS", response.data);
      });
  },
  fetchCurrencies({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {})
      .then((response) => {
        commit("CURRENCIES", response.data);
      });
  },
  fetchEventTypes({ commit }) {
    return this.$axios
      .$get("/support/lists/event-types", {})
      .then((response) => {
        commit("EVENTTYPES", response.data);
      });
  },
  fetchVehicles({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {})
      .then((response) => {
        commit("VEHICLES", response.data);
      });
  },
  fetchCategories({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {})
      .then((response) => {
        commit("CATEGORIES", response.data);
      });
  },
  fetchCategoriesList({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/categories/${payload.type}`, {})
      .then((response) => {
        commit("CATEGORIESLIST", response.data);
      });
  },
  fetchSubCategoriesList({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/categories`, {
        params: {
          parent_id: payload.category_id,
        },
      })
      .then((response) => {
        commit("CATEGORIESLIST", response.data);
      });
  },
  fetchUnitsList({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/units`, {
        params: {
          parent_id: payload.category_id,
        },
      })
      .then((response) => {
        commit("UNITS", response.data);
      });
  },
  fetchOrders({ commit }, payload) {
    return this.$axios
      .$get(`/support/lists/${payload.type}`, {})
      .then((response) => {
        commit("ORDERS", response.data);
      });
  },
  fetchBrandsList({ commit }, payload) {
    return this.$axios.$get(`/support/lists/brands`, {}).then((response) => {
      commit("BRANDS", response.data);
    });
  },
};
