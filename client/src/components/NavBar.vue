<template>
  <v-app-bar app dense color="primary" dark>
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mobile"></v-app-bar-nav-icon>
    <v-list v-if="!$vuetify.breakpoint.mobile"> </v-list>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
</script>
