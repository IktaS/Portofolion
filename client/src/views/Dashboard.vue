<template>
  <div class="home">
    <content-holder>
      <h1>This is the Dashboard</h1>
    </content-holder>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import UserService from "@/services/UserService";
import ContentHolder from "@/components/ContentHolder.vue";
import { vxm } from "@/store/store.vuex";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ContentHolder
  }
})
export default class Dashboard extends Vue {
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
