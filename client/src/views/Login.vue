<template>
  <v-container
    class="fill-height"
    fluid
  >
    <Carousel/>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="cyan darken-1"
            dark
            flat
          >
            <v-toolbar-title>Prijava</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-if="!$store.state.user">
              <v-text-field
                label="Korisničko ime"
                name="login"
                prepend-icon="person"
                type="text"
                v-model="username"
              />

              <v-text-field
                id="password"
                label="Lozinka"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
              />
            </v-form>
            <v-row align="center" justify="center">
              <h4 style="color:red" v-html="error" />
              <h2 v-if="$store.state.user" style="color:black">Dobrodošli {{$store.state.user.firstName}}!</h2>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="fill-height mt-4" align="center" justify="center">
              <v-btn v-if="!$store.state.isUserLoggedIn && !$store.state.isAdmin" color="cyan darken-1" dark @click="login">Prijavi se</v-btn>
              <v-btn v-if="$store.state.isUserLoggedIn || $store.state.isAdmin" color="cyan darken-1" dark class="mt-2" router to="/catalogue">
                <v-icon class="mr-2">menu_book</v-icon>
                Katalog putovanja
              </v-btn>
              <v-btn v-if="$store.state.isUserLoggedIn" color="cyan darken-1" dark class="mt-2" router to="/myTravels">
                <v-icon class="mr-2">airplanemode_active</v-icon>
                Moja putovanja
              </v-btn>
              <v-btn v-if="$store.state.isAdmin" color="cyan darken-1" dark class="mt-2" router to="/admin">
                <v-icon class="mr-2">airplanemode_active</v-icon>
                Dodaj putovanje
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Carousel from '../views/Carous.vue'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      logedin: null
    }
  },

  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password,
        })
        this.$store.dispatch('login', response.data.user)
        this.error = null;
        this.logedin = response.data.user.username
      } catch (error) {
        this.logedin = null;
        this.error = error.response.data.error
      }
    }
  },

  components: {
    Carousel
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    top: 15px;
    color: white;
    font-style: italic;
    padding: 20px;
  }
</style>
