<template>
    <v-container v-if="$store.state.isAdmin" class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="5">
                <v-card class="elevation-12">
                <v-toolbar color="cyan darken-1" dark>
                    <v-toolbar-title>Promena aranžmana</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form autocomplete="off">
                    <v-text-field
                        label="Naziv putovanja"
                        name="title"
                        type="text"
                        v-model="title"
                        required
                    />
                    <v-text-field
                        label="Cena"
                        name="price"
                        type="decimal"
                        v-model="price"
                        required
                    />
                    <v-radio-group v-model="transport" row>
                        <v-radio label="Avionom" value="Avion"></v-radio>
                        <v-radio label="Autobusom" value="Autobus"></v-radio>
                        <v-radio label="Sopstveni prevoz" value="SopstveniPrevoz"></v-radio>
                    </v-radio-group>
                    <v-radio-group v-model="tip" row>
                        <v-radio label="Egzotično putovanje" value="Egzoticno"></v-radio>
                        <v-radio label="Evropska destinacija" value="Evropa"></v-radio>
                        <v-radio label="Nova godina" value="NovaGodina"></v-radio>
                    </v-radio-group>
                    <v-textarea
                        outlined
                        name="description"
                        label="Opis putovanja"
                        v-model="description"
                        class="mt-4"
                    ></v-textarea>
                    <v-row align="center" justify="center" class="mt-4">
                        <v-date-picker v-model="dates" range color="cyan darken-1"></v-date-picker>
                    </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-row align="center" justify="center" class="mt-4 mb-4">
                        <v-btn color="cyan darken-1" class="mr-2 mt-2" dark @click="UpdateTravel">
                            <v-icon class="mr-2">airplanemode_active</v-icon>
                            IZMENI PUTOVANJE
                        </v-btn>
                        <v-btn color="cyan darken-1" class="ml-2 mt-2" dark router to="/catalogue">
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
    </v-container>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data() {
    return {
      title: this.$store.state.travel.title,
      dates: [this.$store.state.travel.dateFrom, this.$store.state.travel.dateTo],
      price: this.$store.state.travel.price,
      description: this.$store.state.travel.description,
      error: '',
      added: '',
      transport: this.$store.state.travel.transport,
      tip: this.$store.state.travel.type
    }
  },

  methods: {
      async UpdateTravel() {
            try{
                const response = await AuthenticationService.updateTravel({
                    title: this.title,
                    dateFrom: this.dateFrom,
                    dateTo: this.dateTo,
                    description: this.description,
                    price: this.price,
                    transport:this.transport,
                    type: this.type,
                    oldTitle: this.$store.state.travel.title
                })
                this.error = null
                this.added = response.data.msg
            } catch (error){
                this.error = error.response.data.error
                this.added = null
            }
        }
    }
    
}
</script>
