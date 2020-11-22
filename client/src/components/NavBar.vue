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
      <div class="navbutton" v-if="!$vuetify.breakpoint.mobile && !isLoggedOn">
        <v-btn depressed class="px-5">
          About
        </v-btn>
        <v-btn outlined class="px-13" to="/login">
          Login
        </v-btn>
      </div>
      <div class="navbutton" v-if="!$vuetify.breakpoint.mobile && isLoggedOn">
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="px-13" v-bind="attrs" v-on="on">
              {{ user.username }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn outlined @click="logout">
                Logout
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-if="!isLoggedOn">
          <v-list-item>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn outlined to="/login">
              Login
            </v-btn>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-if="isLoggedOn">
          <v-list-item inactive>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn outlined @click="logout">
              Logout
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { vxm } from "@/store/store.vuex";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  private drawer = false;
  private group = null;
  private menu = false;

  get isLoggedOn() {
    return vxm.user.isLoggedOn;
  }
  get user() {
    return vxm.user.user;
  }

  public logout() {
    vxm.user.logout();
    window.location.reload();
  }
}
</script>

<style scoped></style>
