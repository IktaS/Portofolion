<template>
  <v-data-iterator
    :items="repoDatas"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    hide-default-footer
  >
    <template v-slot:header>
      <v-toolbar dark color="black" class="mb-1">
        <v-text-field
          v-model="search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        ></v-text-field>
      </v-toolbar>
    </template>

    <template v-slot:default="{ items }">
      <v-row dense>
        <v-col
          v-for="item in items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <github-card :repoData="item" />
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <v-row class="mt-2" align="center" justify="center">
        <span class="grey--text">Items per page</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              text
              color="black"
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ itemsPerPage }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              @click="updateItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span
          class="mr-4
            grey--text"
        >
          Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-btn fab dark color="black darken-3" class="mr-1" @click="formerPage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab dark color="black darken-3" class="ml-1" @click="nextPage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Repo from "@/types/RepoType";
import GithubCard from "@/components/GithubCard.vue";

@Component({
  components: {
    GithubCard
  }
})
export default class GithubCardGrid extends Vue {
  @Prop() repoDatas!: Repo[];

  private itemsPerPageArray = [12, 24, 36];
  private search = "";
  private filter = {};
  private sortDesc = false;
  private page = 1;
  private itemsPerPage = 12;

  get numberOfPages() {
    return Math.ceil(this.repoDatas.length / this.itemsPerPage);
  }

  private nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1;
  }
  private formerPage() {
    if (this.page - 1 >= 1) this.page -= 1;
  }
  private updateItemsPerPage(n: number) {
    this.itemsPerPage = n;
  }
}
</script>

<style scoped></style>
