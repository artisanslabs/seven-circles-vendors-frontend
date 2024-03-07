export default {
  data () {
    return {
      filterDate: [],

      shortCuts: [
        {
          text: this.$vuetify.rtl ? ': فترات محددة' : 'Fixed Periods :'
        },
        {
          text: this.$vuetify.rtl ? 'الأمس' : 'Yesterday',
          onClick: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            const myArray = []
            myArray.push(start)
            myArray.push(end)
            return myArray
          }
        },
        {
          text: this.$vuetify.rtl ? 'الأسبوع الماضي' : 'Last Week',
          onClick () {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            const myArray = []
            myArray.push(start)
            myArray.push(end)
            return myArray
          }
        },
        {
          text: this.$vuetify.rtl ? 'الشهر الماضي' : 'Last Month',
          onClick () {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            const myArray = []
            myArray.push(start)
            myArray.push(end)
            return myArray
          }
        },
        {
          text: this.$vuetify.rtl ? 'السنة الماضية' : 'Last Year',
          onClick () {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
            const myArray = []
            myArray.push(start)
            myArray.push(end)
            return myArray
          }
        }
      ],
      lang: {
        formatLocale: {
          months: [
            'يناير',
            'فبراير',
            'مارس',
            'ابريل',
            'مايو',
            'يونيو',
            'يوليو',
            'اغسطس',
            'سبتمبر',
            'اكتوبر',
            'نوفمبر',
            'ديسمبر'
          ],
          // MMM
          monthsShort: [
            this.$vuetify.rtl ? ' يناير ' : 'Jan',
            this.$vuetify.rtl ? ' فبراير ' : 'Feb',
            this.$vuetify.rtl ? ' مارس ' : 'Mar',
            this.$vuetify.rtl ? ' ابريل ' : 'Apr',
            this.$vuetify.rtl ? ' مايو ' : 'May',
            this.$vuetify.rtl ? ' يونيو ' : 'Jun',
            this.$vuetify.rtl ? ' يوليو ' : 'Jul',
            this.$vuetify.rtl ? ' اغسطس ' : 'Aug',
            this.$vuetify.rtl ? ' سبتمبر ' : 'Sept',
            this.$vuetify.rtl ? ' اكتوبر ' : 'Oct',
            this.$vuetify.rtl ? ' نوفمبر ' : 'Nov',
            this.$vuetify.rtl ? ' ديسمبر ' : 'Dec'
          ],
          // dddd
          weekdays: [
            ' الأحد ',
            ' الإثنين ',
            ' الثلاثاء ',
            ' الأربعاء ',
            ' الخميس ',
            ' الجمعة ',
            ' السبت '
          ],
          // ddd
          weekdaysShort: [
            ' الأحد ',
            ' الإثنين ',
            ' الثلاثاء ',
            ' الأربعاء ',
            ' الخميس ',
            ' الجمعة ',
            ' السبت '
          ],
          // dd
          weekdaysMin: [
            this.$vuetify.rtl ? ' الأحد ' : 'Sun',
            this.$vuetify.rtl ? ' الإثنين ' : 'Mon',
            this.$vuetify.rtl ? ' الثلاثاء ' : 'Tue',
            this.$vuetify.rtl ? ' الأربعاء ' : 'Wed',
            this.$vuetify.rtl ? ' الخميس ' : 'Thu',
            this.$vuetify.rtl ? ' الجمعة ' : 'Fri',
            this.$vuetify.rtl ? ' السبت ' : 'Sat'
          ],
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      }
    }
  },
  methods: {
    async onConfirmDate (val) {
      if (val.length > 0) {
        this.filters.from = val[0] ? val[0] + ' ' + '00:00:00' : ''
        this.filters.to = val[1] ? val[1] + ' ' + '23:59:59' : ''
        await this.$store.dispatch('jobs/fetch', this.filters)
      }
    },
    async onConfirmDateEvents (val) {
      if (val.length > 0) {
        this.filters.from = val[0] ? val[0] + ' ' + '00:00:00' : ''
        this.filters.to = val[1] ? val[1] + ' ' + '23:59:59' : ''
        await this.$store.dispatch('events/fetch', this.filters)
      }
    },
    async onDateFilter (val) {
      if (val.length > 0) {
        this.filters.date_range =
          val[0] !== null && val[1] !== null ? `${val[0]},${val[1]}` : ''
        await this.$store.dispatch('activityLogs/fetch', this.filters)
      }
    },
    async getDateFilter (val) {
      if (val.length > 0) {
        this.filters.date_range =
          val[0] !== null && val[1] !== null ? `${val[0]},${val[1]}` : ''
        await this.$store.dispatch('groupsRequests/fetch', this.filters)
      }
    }
  }
}
