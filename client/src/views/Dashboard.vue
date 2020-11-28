<template>
  <div class="home">
    <content-holder>
      <v-container>
        <v-row>
          <v-col cols="4" align="center">
            <v-row>
              <v-col align="center">
                <v-avatar color="rgba(255,255,255,0)" size="256">
                  <v-icon
                    v-if="user.profilePicture == null"
                    size="256"
                    color="primary"
                  >
                    mdi-account-circle
                  </v-icon>
                  <v-img
                    contain
                    v-if="user.profilePicture != null"
                    :src="
                      `data:${user.profilePicture.img.contentType};base64,${user.profilePicture.img.data}`
                    "
                  >
                  </v-img>
                </v-avatar>
              </v-col>
            </v-row>
            <v-row align="end">
              <v-spacer />
              <v-file-input
                accept="image/png"
                hide-input
                ref="uploadFile"
                prepend-icon="mdi-account-edit"
                truncate-length="0"
                @change="selectFile"
              />
            </v-row>
          </v-col>
          <v-col>
            <v-row align="start">
              <v-col>
                <v-text-field
                  v-model="user.firstName"
                  label="First Name"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="user.lastName"
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
                v-model="user.description"
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
import { Component, Vue, Watch } from "vue-property-decorator";
import User, { emptyUser } from "@/types/UserType";

@Component({
  components: {
    ContentHolder
  }
})
export default class Dashboard extends Vue {
  //eslint-disable-next-line
  private picture: any = undefined;
  private user: User = emptyUser;

  async initUser() {
    const user = await UserService.getHome();
    if (!user) {
      vxm.user.clearUser();
      router.push("/login");
      return;
    }
    vxm.user.setUser(user);
    this.user = vxm.user.user;
  }

  mounted() {
    this.initUser();
  }
  @Watch("user", { deep: true })
  private onUserValueChanged(newUser: User) {
    try {
      UserService.updateUser(newUser);
      vxm.user.setUser(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line
  public selectFile(file: any) {
    this.picture = file;
    this.changePicture();
  }

  public changePicture() {
    const data: FormData = new FormData();
    data.append("profilePicture", this.picture);
    UserService.updateUserPicture(data).then(() => window.location.reload());
  }
}
</script>
