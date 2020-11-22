<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view></router-view>
      <pop-up-snack-bar :snackbar="snackbar.show" :text="snackbar.message" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import PopUpSnackBar from "@/components/PopUpSnackBar.vue";
import { vxm } from "@/store/store.vuex";

@Component({
  name: "App",
  components: {
    NavBar,
    PopUpSnackBar
  }
})
export default class App extends Vue {
  get snackbar() {
    return vxm.event.snackbar;
  }
}
</script>
