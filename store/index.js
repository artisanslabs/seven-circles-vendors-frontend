export const state = () => ({
  showAlert: false,
  alertData: {},
  list: [],
  details: {}
})
export const mutations = {
  setShowAlert (state, payload) {
    state.showAlert = payload
  },
  setAlertData (state, payload) {
    state.alertData = payload
  },
  LIST (state, payload) {
    state.list = payload
  },
  DETAILS (state, payload) {
    state.details = payload
  }
}
export const actions = {
  fetchList ({
    commit
  }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}`, {
        params: {
          search_text: payload.search_text,
          page: payload.page,
          orderBy: payload.orderBy,
          sort: payload.sort,
          perPage: payload.perPage,
          per_page: payload.perPage
        }
      }).then((response) => {
        commit('LIST', response.data)
      }).catch((e) => {})
  },
  showDetails ({
    commit
  }, payload) {
    return this.$axios
      .$get(`/dashboard/${payload.type}/${payload.id}`).then((response) => {
        commit('DETAILS', response.data)
      }).catch((e) => {})
  }
}
