<template>
  <div class="navbar">
    <v-app-bar app dense>
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Portofolion</v-toolbar-title>
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <div class="navbutton" v-if="!$vuetify.breakpoint.mobile">
        <v-btn depressed>
          Features
        </v-btn>

        <v-btn depressed>
          About
        </v-btn>

        <v-btn outlined>
          Login
        </v-btn>
      </div>
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>Features</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn outlined>
              Login
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  private drawer = false;
  private group = null;
}
</script>

<style scoped>
.app-bar-component {
  padding: 50 em;
}
</style>
