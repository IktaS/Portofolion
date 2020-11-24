<template>
  <div class="home">
    <h1>This is A Home page</h1>
    <h1>{{ user.username }}</h1>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import UserService from "@/services/UserService";
import { vxm } from "@/store/store.vuex";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  get user() {
    return vxm.user.user;
  }

  async initUser() {
    const user = await UserService.getHome();
    if (!user) {
      vxm.user.clearUser();
      router.push("/login");
      return;
    }
    vxm.user.setUser(user);
  }

  mounted() {
    this.initUser();
  }
}
</script>
