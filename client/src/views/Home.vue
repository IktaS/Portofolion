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
import User, { emptyUser } from "@/types/UserType";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  private user: User = emptyUser;

  async initUser() {
    const user = await UserService.getHome();
    if (!user) {
      vxm.user.clearUser();
      router.push("/login");
      return;
    }
    this.user = user;
  }

  mounted() {
    this.initUser();
  }
}
</script>
