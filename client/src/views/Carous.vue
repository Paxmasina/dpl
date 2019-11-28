<template>
  <v-container>
    <v-layout row wrap class="mt-2">
      <v-flex >
        <v-carousel cycle>
          <v-carousel-item
            v-for="travel in travels"
            :src="travel.imageURL"
            :key="travel.id">
            <div class="title">
              {{travel.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
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
      this.travels = response.data.slice(7,11)
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