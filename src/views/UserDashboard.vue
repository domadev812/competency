<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app>
      <v-list>
        <v-list-tile :to="{path: item.path}"
          value="true"
          v-for="(item, i) in items"
          :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="logout">
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Overview',
          path: '/dashboard/overview'
        },
        {
          icon: 'bubble_chart',
          title: 'Profile',
          path: '/dashboard/profile'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'User Dashboard'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('accessToken')
      window.location.href = '/'
    }
  }
}
</script>

<!--<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="connected">
      <HelloWorld msg="Hola ;)"/>
    </div>
    <div v-else>
      <span>connecting...</span>    
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    connected(){
      return this.$store.state.sdp.isConnected
    }
  }
}
</script>
-->