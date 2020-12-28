<template>
  <v-card height="100%" outlined class="card-outter">
    <v-container>
      <v-row>
        <v-card-title>{{ repo.name }}</v-card-title>
      </v-row>
      <v-row>
        <v-card-text v-if="repo.description !== null">
          {{ repo.description }}
        </v-card-text>
        <v-card-text v-if="repo.description === null">
          No description
        </v-card-text>
      </v-row>
      <v-row>
        <v-col>
          <v-chip-group column class="card-chips">
            <v-chip
              v-for="language in repo.languages"
              :key="language"
              disabled
              small
              text-color="white"
              color="black"
            >
              {{ language }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col>
          <v-card-actions class="card-actions">
            <v-spacer />
            <v-btn icon :href="repo.url">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn icon @click="changeRepoVisibility" v-if="showVisibility">
              <v-icon v-if="repo.isPublic">mdi-eye</v-icon>
              <v-icon v-if="!repo.isPublic">mdi-eye-off</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Repo from "@/types/RepoType";
import UserService from "@/services/UserService";

@Component
export default class GithubCard extends Vue {
  @Prop() repoData!: Repo;
  @Prop({ default: true }) showVisibility!: Repo;
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

<style scoped>
.card-outter {
  padding-bottom: 4rem;
}

.card-actions {
  position: absolute;
  bottom: 0;
  right: 0;
}

.card-chips {
  position: absolute;
  bottom: 2rem;
  left: 1rem;
}
</style>
