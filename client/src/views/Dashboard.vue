<template>
  <div class="home">
    <content-holder>
      <v-container>
        <v-row>
          <v-col cols="4" align="center">
            <v-row>
              <v-col align="center">
                <v-avatar color="rgba(255,255,255,0)" size="256">
                  <v-icon v-if="!havePicture" size="256" color="primary">
                    mdi-account-circle
                  </v-icon>
                  <v-img
                    contain
                    v-if="havePicture"
                    :src="
                      `data:${pictureData.contentType};base64,${pictureData.data}`
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
            <v-row align="start" v-if="userDataLoadingStatus">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
            <v-row align="start" v-if="!userDataLoadingStatus">
              <v-col>
                <v-text-field
                  v-model="userData.firstName"
                  label="First Name"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="userData.lastName"
                  label="Last Name"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="!userDataLoadingStatus">
              <v-textarea
                clearable
                clear-icon="mdi-close-circle"
                label="Describe yourself!"
                v-model="userData.description"
              ></v-textarea>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="!hasToken">
          <v-col align="center">
            <v-btn :href="oauthLink">
              <v-icon>mdi-github</v-icon>
              Connect my Github Account
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="hasToken">
          <v-row>
            <v-col align="center">
              <v-sheet>
                <v-slide-group class="pa-4">
                  <v-slide-item
                    v-for="repo in reposData"
                    :key="repo.id"
                    style="margin: 3px"
                  >
                    <github-card :repoData="repo"> </github-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-col>
          </v-row>
        </div>
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
import { Debounce } from "@/utils/eventsUtil";
import GithubCard from "@/components/GithubCard.vue";
import Repo from "@/types/RepoType";
@Component({
  components: {
    ContentHolder,
    GithubCard
  }
})
export default class Dashboard extends Vue {
  private userData: User = emptyUser;
  //eslint-disable-next-line
  private userDataLoadingStatus: boolean = true;

  async getUserData() {
    UserService.getHome()
      .then(user => {
        if (!user) {
          vxm.user.logout();
          router.push("/login");
          return;
        }
        this.userDataLoadingStatus = false;
        this.userData = user;
        vxm.user.setUser(user);
      })
      .then(() => {
        this.getPictureData();
        this.getReposData();
      });
  }

  private pictureData: any;
  private havePicture = false;

  async getPictureData() {
    UserService.getUserPicture(vxm.user.user.username).then(val => {
      if (!val) {
        this.havePicture = false;
        return;
      }
      this.pictureData = val.img;
      this.havePicture = true;
    });
  }

  private reposData: Repo[] = new Array<Repo>();
  //eslint-disable-next-line
  private hasToken = false;

  async getReposData() {
    UserService.getUserRepos(vxm.user.user.username).then(repos => {
      if (!repos) {
        this.hasToken = false;
        return;
      }
      this.reposData = repos;
      this.hasToken = true;
    });
  }

  private oauthLink = `https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_URL}/oauth/redirect&scope=repo`;
  public updateUser(newUser: User) {
    try {
      UserService.updateUser(newUser);
      vxm.user.setUser(newUser);
    } catch (error) {
      console.log(error);
    }
  }
  private userDebouncer = new Debounce(this.updateUser, 300);

  mounted() {
    this.getUserData();
  }

  @Watch("userData", { deep: true })
  private onUserValueChanged(newUser: User) {
    this.userDebouncer.trigger(newUser);
  }

  private picture: any;
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
