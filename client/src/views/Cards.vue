<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(travel, i) in travels">
        <v-col
          :key="i"
          cols="12"
          md="4"
        >
            <h2> {{ travel.title }} </h2>
            <v-card
            >
              <v-img
                :src="travel.imageURL"
                height="320px"
              >
              </v-img>
            </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>



<script>
import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data () {
      return {
        travels: []
      }
    },

    async created() {
      const response = await AuthenticationService.getTravels()
      this.travels = response.data.slice(0,3)
    }
  }
</script>
