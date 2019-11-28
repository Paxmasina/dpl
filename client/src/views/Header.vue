<template>
  <div>
    <v-toolbar color="cyan" dark>
      <v-btn dark small color="cyan darken-1" roter to="/">
        <v-icon>train</v-icon>
        <v-icon>airplanemode_active</v-icon>
        <v-icon>directions_boat</v-icon>
        <v-toolbar-title class="ml-4">Vue-Travel</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn v-if="$store.state.isUserLoggedIn || $store.state.isAdmin" dark color="cyan darken-1" class="ml-3" router to="/" @click="logout">
        <v-icon class="mr-1">exit_to_app</v-icon>
        Odjavite se
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
