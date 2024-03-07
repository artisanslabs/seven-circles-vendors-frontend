export default function ({ app, $axios }) {
  $axios.onRequest((config) => {
    const { locale } = app.context.app.i18n
    if (config.params) {
      config.params.locale = locale || 'en'
    } else {
      config.params = {}
      config.params.locale = locale || 'en'
    }
  })
}
