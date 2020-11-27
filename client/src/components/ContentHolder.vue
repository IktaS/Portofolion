<template>
  <v-container>
    <v-row align="center">
      <v-col md="8" offset-md="2">
        <v-card class="content">
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ContentHolder extends Vue {}
</script>

<style scoped>
.content {
  padding: 1rem;
}
</style>
