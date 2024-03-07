export default {
  data () {
    return {
      windowSize: null
    }
  },
  methods: {
    handleWindowSize () {
      this.windowSize = window.innerWidth
    }
  },
  mounted () {
    this.handleWindowSize()
    window.addEventListener('resize', this.handleWindowSize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowSize)
  }
}
