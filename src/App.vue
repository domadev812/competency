<template>
  <v-app>
    <v-content>
      <transition name="fade-transition">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>