<template>
  <div class="home">
    <content-holder>
      <v-container>
        <v-row>
          <v-col cols="4" align="center">
            <v-avatar color="primary" size="256"></v-avatar>
          </v-col>
          <v-col>
            <v-row align="start">
              <v-col>
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea
                clearable
                clear-icon="mdi-close-circle"
                label="Describe yourself!"
                value="Description of yourself"
              ></v-textarea>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <h1>Template text</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <h1>Template text two</h1>
          </v-col>
        </v-row>
      </v-container>
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
