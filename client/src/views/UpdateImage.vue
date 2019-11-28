<template>
    <v-row align="center" justify="center">
        <v-col cols="6">
            <v-card class="mx-auto">
                <v-row align="center" justify="center">
                    <h2>{{this.$store.state.travel.title}}</h2>
                </v-row>
                <v-img
                    class="white--text align-end"
                    :src="travelImg"
                >
                </v-img>
                <v-file-input label="Fotografija" class="mt-4" @change="onFileSelected"></v-file-input>
                <v-card-actions>
                    <v-row align="center" justify="center" class="mt-4 mb-4">
                        <v-btn color="cyan darken-1" class="mr-4 mt-2" dark @click="UpdateTravelImage">
                            <v-icon class="mr-2">insert_photo</v-icon>
                            Promeni Fotografiju
                        </v-btn>
                        <v-btn color="cyan darken-1" class="ml-4 mt-2" dark router to="/catalogue">
                            <v-icon class="mr-2">menu_book</v-icon>
                            Katalog putovanja
                        </v-btn>
                    </v-row>
                </v-card-actions>
                <v-row align="center" justify="center" class="mt-2 mb-4">
                    <h4 style="color:red" v-html="error" />
                    <h4 style="color:blue">{{added}}</h4>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data() {
        return {
            travelImg: this.$store.state.travel.imageURL
        }
    },

    methods: {
      onFileSelected(event) {
          this.selectedFile = event
      },
      async UpdateTravelImage() {
        const fd = new FormData();
        fd.append('travelImage', this.selectedFile)
        fd.append('title', this.$store.state.travel.title)
        try{
            const response = await AuthenticationService.updateTravelImage(fd)
            this.error = null
            this.added = response.data.msg
            this.travelImg = response.data.imageURL
        } catch (error){
            this.error = error.response.data.error
            this.added = null
        }

    }
    }
}
</script>

<style>

</style>