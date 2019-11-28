<template>
    <v-app>
      <Header/>
      <main>
        <router-view></router-view>
      </main>
    </v-app>
</template>

<script>

import Header from './views/Header.vue'

  export default {
    data () {
      return {}
    },
    components: {
      Header,
    }
  }
</script>

