<template>
  <v-row>
    <v-col cols="12" class="flex justify-end main-header">
      <ProfileMenu />
    </v-col>
  </v-row>
</template>

<script>
import ProfileMenu from '~/components/core/ProfileMenu.vue'
export default {
  name: 'MainHeader',
  components: {
    ProfileMenu
  }
}
</script>

<style scoped lang="scss">
.main-header {
  padding: 24px 6% 15px !important;
}
</style>
