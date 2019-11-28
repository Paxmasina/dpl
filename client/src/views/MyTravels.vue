<template>
  <v-container class="pa-4 text-center">
    <v-row align="center" justify="center" class="mb-4">
        <h2> MOJA PUTOVANJA </h2>
    </v-row>
    <hr/>
    
    <v-row class="fill-height mt-4" align="center" justify="center">
      
      <template v-for="(travel, i) in travels">
        <v-col :key="i" cols="12" md="4">
            <v-card>
              <v-img :src="travel.imageURL" height="225px">
              </v-img>
            </v-card>
            <h3> Destinacija: {{ travel.title }} </h3>
            <h3> Datum polaska: {{ travel.dateFrom }} </h3>
            <h3> Datum povratka: {{ travel.dateTo }} </h3>
            <h3> Cena: {{ travel.price }}€ </h3>
            <v-row align="center" justify="center">
              <v-btn v-if="$store.state.isUserLoggedIn" color="black" dark @click="cancelTravel(travel)">
                  Otkaži putovanje
              </v-btn>
            </v-row>
        </v-col>
      </template>
    </v-row>
    <v-row align="center" justify="center" class="mt-6">
        <h4>*Ukoliko otkažete putovanje sedam ili manje dana pred put dužni ste da platite punu cenu aranžmana.</h4>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data () {
      return {
        travels: [],
        clickedTravel: '',
        error: ''
      }
    },

    async created() {
      const response = await AuthenticationService.getUserTravels({
          userId: this.$store.state.user.id
      })
      this.travels = response.data
    },
    methods: {
      async cancelTravel(travel) {
          try{
            this.clickedTravel = travel.title
            await AuthenticationService.cancelTravel({
              travelId: travel.id,
              userId: this.$store.state.user.id
            })
            const response = await AuthenticationService.getUserTravels({
              userId: this.$store.state.user.id
            })
            this.travels = response.data
            this.error = null
          } catch (error) {
            this.error = error.response.data.error
        }
      },
    }
  }
</script>