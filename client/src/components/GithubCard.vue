<template>
  <v-card>
    <v-card-title> {{ repoData.name }}</v-card-title>
    <v-card-text> {{ repoData.description }}</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Repo, { emptyRepo } from "@/types/RepoType";

@Component
export default class GithubCard extends Vue {
  @Prop() repoData: Repo = emptyRepo;
}
</script>

<style scoped></style>
