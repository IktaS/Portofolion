<template>
  <div class="navbar">
    <v-app-bar app dense elevation="2" dark>
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        class="hamburger-button"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="logo text-h5">
        <button @click="Home">
          PortoGit
        </button>
      </v-toolbar-title>
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <v-spacer v-if="!$vuetify.breakpoint.mobile" />
      <div class="navbutton" v-if="!$vuetify.breakpoint.mobile && !isLoggedIn">
        <v-btn depressed class="px-5">
          About
        </v-btn>
        <v-btn outlined class="px-13" to="/login">
          Login
        </v-btn>
      </div>
      <div class="navbutton" v-if="!$vuetify.breakpoint.mobile && isLoggedIn">
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="px-6" v-bind="attrs" v-on="on">
              <v-spacer />
              {{ user.username }}
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item>
              <v-btn @click="dashboard" text>
                Dashboard
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="logout" text>
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
        <v-list-item-group v-if="!isLoggedIn">
          <v-list-item>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn outlined to="/login">
              Login
            </v-btn>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-if="isLoggedIn" dense>
          <v-list-item inactive>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn @click="dashboard" text>
              Dashboard
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn @click="logout" text>
              Logout
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import UserService from "@/services/UserService";
import { vxm } from "@/store/store.vuex";
import { emptyUser } from "@/types/UserType";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  private drawer = false;
  private group = null;
  private menu = false;

  get isLoggedIn() {
    if (this.user !== emptyUser) {
      return true;
    } else {
      return false;
    }
  }

  get user() {
    return vxm.user.user;
  }

  public logout() {
    vxm.user.logout().then(() => {
      router.push("/login");
    });
  }

  public dashboard() {
    vxm.user.logout().then(() => {
      router.push("/dashboard");
    });
  }

  public Home() {
    if (this.isLoggedIn) {
      router.push("/dashboard").catch(() => {
        return null;
      });
    } else {
      router.push("/").catch(() => {
        return null;
      });
    }
  }

  mounted() {
    this.getUserData();
  }

  async getUserData() {
    UserService.getHome().then(user => {
      if (!user) {
        return;
      }
      vxm.user.setUser(user);
    });
  }
}
</script>

<style scoped>
.logo {
  color: whitesmoke;
}

.hamburger-button {
  color: whitesmoke;
}
</style>
