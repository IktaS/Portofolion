<template>
  <v-card width="200" height="300" elevation="2" outlined>
    <v-card-title>{{ repoData.name }}</v-card-title>
    <v-card-text> {{ repoData.description }}</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon :href="repoData.url">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Repo from "@/types/RepoType";

@Component
export default class GithubCard extends Vue {
  @Prop() repoData!: Repo;
}
</script>

<style scoped></style>
