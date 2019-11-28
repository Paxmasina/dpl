<template>
    <v-container v-if="$store.state.isAdmin" class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="5">
                <v-card class="elevation-12">
                <v-toolbar color="cyan darken-1" dark>
                    <v-toolbar-title>Dodavanje aranžmana</v-toolbar-title>
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
                    <v-file-input label="Fotografija" @change="onFileSelected"></v-file-input>
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
                        <v-btn color="cyan darken-1" dark @click="AddTravel">
                            <v-icon class="mr-2">airplanemode_active</v-icon>
                            DODAJ PUTOVANJE
                        </v-btn>
                    </v-row>

                    <v-row align="center" justify="center" class="mt-4 mb-4">
                        <v-btn color="cyan darken-1" class="ml-3" dark router to="/catalogue">
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
      title: '',
      dates: ['2019-11-25', '2019-11-30'],
      price: '',
      description: '',
      selectedFile: null,
      error: '',
      added: '',
      transport: '',
      tip: ''
    }
  },

  methods: {
      onFileSelected(event) {
          this.selectedFile = event
      },
      async AddTravel() {
        
        const fd = new FormData();
        fd.append('travelImage', this.selectedFile)
        fd.append('title', this.title)
        fd.append('dateFrom', this.dates[0])
        fd.append('dateTo', this.dates[1])
        fd.append('description', this.description)
        fd.append('price', this.price)
        fd.append('transport', this.transport)
        fd.append('type', this.tip)
        try{
            const response = await AuthenticationService.addTravel(fd)
            this.error = null
            this.added = response.data.msg
        } catch (error){
            this.error = error.response.data.error
            this.added = null
        }
    }
  },

}
</script>
