<template>
  <div>
    <v-row>
      <v-col cols="12" class="text-center mt-10">
        <v-card
          elevation="2"
          shaped
          tile
          class="pa-4"
        >
          <div class="d-flex justify-space-between">
            <div>
              <h2 class="second-font-color">
                {{ $t('links.settings') }}
              </h2>
            </div>
            <v-btn class="add-btn" dark @click="handleUpdate">
              <span class="btn-text white--text">
                {{ $t("v.update") }}
              </span>
            </v-btn>
          </div>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('settings.name') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-text-field
                v-model="form.name"
                placeholder="اكتب اسم الشركة"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('settings.phone') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-text-field
                v-model="form.phone"
                placeholder="اكتب جوال الشركة"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('settings.telphone') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-text-field
                v-model="form.telphone"
                placeholder="اكتب تلفون الشركة"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('settings.logo') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-file-input
                placeholder="شعار الشركة"
                :rules="[requiredRules]"
                outlined
                dense
                append-icon="mdi-file-image"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start mb-2">
                <span>{{ $t('settings.website') }}</span>
                <span class="red-color">{{ $t('v.required') }}</span>
              </div>
              <v-text-field
                v-model="form.website"
                placeholder="اكتب موقع الشركة"
                type="text"
                :rules="[requiredRules]"
                validate-on-blur
                outlined
                dense
                required
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  data () {
    return {
      loading: false,
      form: {},
      oldForm: {},
      requiredRules: v => !!v || this.$t('v.field_required')
    }
  },
  head: {
    title: 'الإعدادات'
  }
}
</script>
