<template>
  <v-card width="200" height="300" elevation="2" outlined>
    <v-card-title>{{ repo.name }}</v-card-title>
    <v-card-text v-if="repo.description !== null">
      {{ repo.description }}
    </v-card-text>
    <v-card-text v-if="repo.description === null">
      No description
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon :href="repo.url">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn icon @click="changeRepoVisibility">
        <v-icon v-if="repo.isPublic">mdi-eye</v-icon>
        <v-icon v-if="!repo.isPublic">mdi-eye-off</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Repo from "@/types/RepoType";
import UserService from "@/services/UserService";

@Component
export default class GithubCard extends Vue {
  @Prop() repoData!: Repo;
  get repo() {
    return this.repoData;
  }
  private changeRepoVisibility() {
    const data = {
      id: this.repo.id,
      isPublic: !this.repo.isPublic
    };
    UserService.updateUserRepoVisibility(data);
    this.repo.isPublic = !this.repo.isPublic;
  }
}
</script>

<style scoped></style>
