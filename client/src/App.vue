<template>
  <v-app>
    <NavBar />
    <v-main @callSnackbar="callSnackbar">
      <router-view></router-view>
      <pop-up-snack-bar ref="snackbar" :snackbar="snackbar" :text="text" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import PopUpSnackBar from "@/components/PopUpSnackBar.vue";

@Component({
  name: "App",
  components: {
    NavBar,
    PopUpSnackBar
  }
})
export default class App extends Vue {
  private snackbar = false;
  private text = "";

  public callSnackbar(value: string) {
    this.snackbar = true;
    this.text = value;

    setTimeout(() => (this.snackbar = false), 2000);
  }
}
</script>
