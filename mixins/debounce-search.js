export default {
  data () {
    return {
      debounce_time: null
    }
  },
  methods: {
    debounceSearch () {
      clearTimeout(this.debounce_time)
      this.debounce_time = setTimeout(() => {
        this.fetch(1)
      }, 1000)
    }
  }
}
