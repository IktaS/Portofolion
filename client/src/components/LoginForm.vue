<template>
  <v-card>
    <h1>Form Here</h1>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginForm extends Vue {
  private valid = null;
}
</script>

<style scoped></style>
