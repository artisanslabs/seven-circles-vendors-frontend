class GlobalResource {
  resource = '/dashboard'
  // eslint-disable-next-line no-useless-constructor
  constructor () {
  }

  // Function to Send Request and Get Response
  sendRequest (route) {
    return route.then((res) => {
      return res
    })
      .catch((e) => {
        return e.response ? e.response.data : {}
      })
  }

  /* ############################### Add And Update ############################### */

  create ($axios, payload) {
    return this.sendRequest($axios.$post(`${this.resource}/${payload.type}`, payload.formData))
  }

  update ($axios, payload) {
    return this.sendRequest($axios.$post(`${this.resource}/${payload.type}/${payload.id}`, payload.formData))
  }

  delete ($axios, payload) {
    return this.sendRequest($axios.$delete(`${this.resource}/${payload.item_id}/${payload.type}`))
  }

  // delete ($axios, payload) {
  //   return this.sendRequest($axios.$delete(`${this.resource}/${payload.id}/${payload.item_id}/${payload.type}`))
  // }

  login ($axios, payload) {
    return this.sendRequest($axios.$post('/dashboard/accounts/login'), payload.formData)
  }

  updateStatus ($axios, payload) {
    return this.sendRequest($axios.$post(`${this.resource}/${payload.type}/status/${payload.id}/${payload.statusType}`, payload.formData))
  }
}

//* * Singleton Service **//
const GlobalServices = new GlobalResource()

export default GlobalServices
