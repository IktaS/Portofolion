<template>
  <v-app>
    <v-app-bar app dense color="primary" dark>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main> </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  })
});
</script>
