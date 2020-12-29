<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <v-spacer />
      </v-col>
      <v-col cols="7">
        <v-row dense>
          <p class="text-h2 font-weight-bold">
            Showcase your github work easily with PortoGit
          </p>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn to="/signup" dark large>
            <span class="text-h5 font-weight-regular text-capitalize">
              Sign Up
            </span>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-icon size="400" color="black">
          mdi-github
        </v-icon>
      </v-col>
      <v-col>
        <v-spacer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class About extends Vue {}
</script>
