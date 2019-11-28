<template>
  <v-container>
    <Carousel/>
     <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-center">
        <h1 class="mb-6">Dobrodošli u agenciju Vue-Travel</h1>
        <h2 v-if="!$store.state.isUserLoggedIn && !$store.state.isAdmin">Prijavite se za dalju pretragu</h2>

        <v-btn v-if="!$store.state.isUserLoggedIn && !$store.state.isAdmin" large dark color="cyan darken-1" class="ml-3 mb-3 mt-3" router to="/register">
          Registracija
        </v-btn>
        <v-btn v-if="!$store.state.isUserLoggedIn && !$store.state.isAdmin" large dark color="cyan darken-1" class="ml-3 mb-3 mt-3" router to="/login">
          Prijavite se
        </v-btn>

        <v-btn v-if="$store.state.isUserLoggedIn || $store.state.isAdmin" large color="cyan darken-1" class="ml-3 mb-3 mt-3" dark router to="/catalogue">
          <v-icon class="mr-2">menu_book</v-icon>
          Katalog putovanja
        </v-btn>
        
        <v-btn v-if="$store.state.isUserLoggedIn" large color="cyan darken-1" class="ml-3 mb-3 mt-3" dark router to="/myTravels">
          <v-icon class="mr-2">airplanemode_active</v-icon>
          Moja putovanja
        </v-btn>
        <v-btn v-if="$store.state.isAdmin" large color="cyan darken-1" class="ml-3 mb-3 mt-3" dark router to="/Admin">
          <v-icon class="mr-2">airplanemode_active</v-icon>
          Dodaj putovanje
        </v-btn>
      </v-flex>
    </v-layout>
    <div class="mt-8">
      <hr>
      <h1 class="mt-4" align="center" justify="center"> POPULARNI TURISTIČKI ARANŽMANI </h1>
      <cards/>
    </div>
  </v-container>
</template>

<script>
import Carousel from '../views/Carous.vue'
import Cards from '../views/Cards.vue'

  export default {
    data () {
      return {
      }
    },
    components: {
      Carousel,
      Cards
    }
  }
</script>

