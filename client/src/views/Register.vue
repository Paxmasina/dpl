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
                <v-toolbar-title>Registracija</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text v-if="!registred">
                <v-form autocomplete="off">
                  <v-text-field
                    label="Korisničko ime"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Lozinka"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    required
                  />

                  <v-text-field
                    label="Ime"
                    name="firstName"
                    prepend-icon="person"
                    type="text"
                    v-model="firstName"
                    required
                  />

                  <v-text-field
                    label="Prezime"
                    name="lastName"
                    prepend-icon="person"
                    type="text"
                    v-model="lastName"
                    required
                  />
                  
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="email"
                    type="text"
                    v-model="email"
                    required
                  />
                </v-form>
                <h4 style="color:red" v-html="error" />
              </v-card-text>
              <v-card-text v-if="registred">
                <h1 class="mb-4" style="color:black">{{ registred }}</h1>
                <h2 class="mb-3" style="color:black">Vaši podaci:</h2>
                <h3 class="mb-2" style="color:black">Korisničko ime: <span style="color:blue"> {{username}} </span></h3>
                <h3 class="mb-2" style="color:black">Lozinka: <span style="color:blue"> {{password}} </span></h3>
                <h3 class="mb-2" style="color:black">Ime: <span style="color:blue"> {{firstName}} </span></h3>
                <h3 class="mb-2" style="color:black">Prezime: <span style="color:blue"> {{lastName}} </span></h3>
                <h3 class="mb-2" style="color:black">Email: <span style="color:blue"> {{email}} </span></h3>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-if="!registred" color="cyan darken-1" dark @click="register">Registracija</v-btn>
                <v-btn v-if="registred" color="cyan darken-1" dark router to="/login">Prijavi se</v-btn>
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
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: null,
      registred: null
    }
  },

  methods: {
    async register() {
      try {
        // eslint-disable-next-line
        const response = await AuthenticationService.register({
          username: this.username,
          password: this.password,
          email: this.email,
          lastName: this.lastName,
          firstName: this.firstName,
          isAdmin: "false"
        })
        this.error = null
        this.registred = "Korisnik uspešno registrovan!"
      } catch (error) {
        this.registred = null
        this.error = error.response.data.error
      }
    }
  },

  components: {
    Carousel
  }
}
</script>
