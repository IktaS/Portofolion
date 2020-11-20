<template>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PopUpSnackBar extends Vue {
  @Prop() private snackbar = false;
  @Prop() private text = "";
}
</script>

<style scoped></style>
