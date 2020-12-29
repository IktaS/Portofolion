<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <v-spacer />
      </v-col>
      <v-col cols="8">
        <p class="text-h2 font-weight-bold text-center">
          Error {{ this.$route.params.errorcode }}
        </p>
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
export default class ErrorPage extends Vue {}
</script>
