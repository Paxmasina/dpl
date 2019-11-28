<template>
  <v-container v-if="$store.state.isUserLoggedIn || $store.state.isAdmin" class="pa-4 text-center">
    <v-row align="center" justify="center">
      <h2> KATALOG PUTOVANJA </h2>
      <v-spacer/>
      <v-col cols="2">
        <v-text-field
          label="Pretraži putovanja"
          prepend-inner-icon="search"
          v-model="search"
          ></v-text-field>  
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="mb-2">
        <h3 style="color:red">{{error}}</h3>
        <h3 style="color:blue">{{registred}}</h3>
    </v-row>
    <hr class="mb-4">
    <v-row align="center" justify="center" class="mb-2">
      <v-radio-group v-model="filter" row>
        <v-radio label="Evropska putovanja" value="Evropa"></v-radio>
        <v-radio label="Egzotične destinacije" value="Egzoticno"></v-radio>
        <v-radio label="Nova godina" value="NovaGodina"></v-radio>
      </v-radio-group>
    </v-row>
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(travel, i) in filtTravels">
        <v-col
          :key="i"
          cols="12"
          md="8"
        >
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              :src="travel.imageURL"
            >
            </v-img>

            <v-card-text style="color:black">
              <h2 class="mb-3">{{ travel.title }}</h2>
              <h3>Polazak: {{travel.dateFrom}}</h3>
              <h3>Povratak: {{travel.dateTo}}</h3>
              <h3>Cena: {{travel.price}}€</h3>
              <h3>Prevoz: {{travel.transport}}</h3>
              <h4 class="mt-4">{{travel.description}}</h4>
            </v-card-text>
            <v-card-actions>
              <v-row align="center" justify="center">
                <v-btn v-if="$store.state.isUserLoggedIn" color="black" dark @click="registerForTravel(travel)">
                  Prijavi se
                </v-btn>
                <v-btn v-if="$store.state.isAdmin" color="black" class="mr-4" dark @click="deleteTravel(travel)">
                  Obriši putovanje
                </v-btn>
                <v-btn v-if="$store.state.isAdmin" color="black" class="ml-4 mr-4" dark @click="updateTravel(travel)">
                  Izmeni putovanje
                </v-btn>
                <v-btn v-if="$store.state.isAdmin" color="black" class="ml-4" dark @click="updateTravelImage(travel)">
                  Promeni fotografiju
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data: () => ({
      travels: [],
      error: '',
      registred: '',
      deleted: '',
      clickedTravel: '',
      search: '',
      filter: 'Evropa'
    }),

    methods: {
      async registerForTravel(travel) {
        try {
          this.clickedTravel = travel.title
          const response = await AuthenticationService.registerForTravel({
            userId: this.$store.state.user.id,
            travelId: travel.id,
            quantity: 1
          })
          this.error = null
          this.registred = response.data.msg + ' ' + this.clickedTravel
        } catch (error) {
          this.registred = null
          this.error = error.response.data.error + ' ' + this.clickedTravel
        }
      },

      async deleteTravel(travel) {
        try{
          this.clickedTravel = travel.title
          const response = await AuthenticationService.deleteTravel({
            travelId: travel.id
          })
          const reload = await AuthenticationService.getTravels()
          this.travels = reload.data
          this.deleted = response.data.msg + ' ' + this.clickedTravel
          this.error = null
        } catch (error) {
          this.error = error.response.data.error
          this.deleted = null
        }
      },

      updateTravel(travel) {
        this.$store.dispatch('update', travel)
        this.$router.push('update')
      },

      updateTravelImage(travel) {
        this.$store.dispatch('update', travel)
        this.$router.push('updateImage')
      }

    },

    async created() {

      const response = await AuthenticationService.getTravels()
      this.travels = response.data
    },

    computed: {
      filteredTravels: function() {
        return this.travels.filter((travel) => {
          let fTravels = travel.title.match(this.search)
          return fTravels
        })
      },
      filtTravels: function() {
        return this.filteredTravels.filter((travel) => {
          return travel.type.match(this.filter)
        })
      }
    }
  }
</script>