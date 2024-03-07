import Vue from 'vue'

import alertMixins from '~/mixins/sharedAlert'
import debounceSearchMixins from '~/mixins/debounce-search'
import getNameMixins from '~/mixins/get-name'
import datePickerMixin from '~/mixins/datePickerMixin'

Vue.mixin(alertMixins)
Vue.mixin(debounceSearchMixins)
Vue.mixin(getNameMixins)
Vue.mixin(datePickerMixin)
