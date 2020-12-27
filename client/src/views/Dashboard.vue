<template>
  <div class="home">
    <content-holder>
      <v-container>
        <v-row v-if="!$vuetify.breakpoint.mobile">
          <v-col cols="4" align="center" class="userPicture">
            <v-row>
              <v-col align="center">
                <v-avatar color="rgba(255,255,255,0)" size="256">
                  <v-progress-circular
                    indeterminate
                    color="black"
                    v-if="isPictureLoading"
                  ></v-progress-circular>
                  <v-icon
                    v-if="!havePicture && !isPictureLoading"
                    size="256"
                    color="primary"
                  >
                    mdi-account-circle
                  </v-icon>
                  <v-img
                    contain
                    v-if="havePicture && !isPictureLoading"
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
          <v-col align="start" class="userData">
            <v-row align="center" v-if="userDataLoadingStatus">
              <v-progress-circular
                indeterminate
                color="black"
              ></v-progress-circular>
            </v-row>
            <v-row align="start" v-if="!userDataLoadingStatus">
              <v-col align="start">
                <v-text-field
                  v-model="userData.firstName"
                  label="First Name"
                  clearable
                  outlined
                ></v-text-field>
              </v-col>
              <v-col align="start">
                <v-text-field
                  v-model="userData.lastName"
                  label="Last Name"
                  clearable
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="!userDataLoadingStatus">
              <v-col align="start">
                <v-textarea
                  clearable
                  outlined
                  clear-icon="mdi-close-circle"
                  label="Describe yourself!"
                  v-model="userData.description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="$vuetify.breakpoint.mobile" dense>
          <v-col>
            <v-row>
              <v-col align="center">
                <v-avatar color="rgba(255,255,255,0)" size="256">
                  <v-progress-circular
                    indeterminate
                    color="black"
                    v-if="isPictureLoading"
                  ></v-progress-circular>
                  <v-icon
                    v-if="!havePicture && !isPictureLoading"
                    size="256"
                    color="primary"
                  >
                    mdi-account-circle
                  </v-icon>
                  <v-img
                    contain
                    v-if="havePicture && !isPictureLoading"
                    :src="
                      `data:${pictureData.contentType};base64,${pictureData.data}`
                    "
                  >
                  </v-img>
                </v-avatar>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col align="center">
                <v-file-input
                  accept="image/png"
                  hide-input
                  ref="uploadFile"
                  prepend-icon="mdi-account-edit"
                  truncate-length="0"
                  @change="selectFile"
                />
              </v-col>
            </v-row>
            <v-row v-if="userDataLoadingStatus">
              <v-col align="center">
                <v-progress-circular
                  indeterminate
                  color="black"
                ></v-progress-circular>
              </v-col>
            </v-row>
            <v-row align="center" v-if="!userDataLoadingStatus">
              <v-col align="center">
                <v-text-field
                  v-model="userData.firstName"
                  label="First Name"
                  clearable
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-text-field
                  v-model="userData.lastName"
                  label="Last Name"
                  clearable
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="!userDataLoadingStatus">
              <v-col align="center">
                <v-textarea
                  clearable
                  outlined
                  clear-icon="mdi-close-circle"
                  label="Describe yourself!"
                  v-model="userData.description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="isRepoLoading" class="userRepo">
          <v-col align="center">
            <v-progress-circular
              indeterminate
              color="black"
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-row v-if="!hasToken && !isRepoLoading" class="userRepo">
          <v-col align="center">
            <v-btn :href="oauthLink">
              <v-icon>mdi-github</v-icon>
              Connect my Github Account
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="hasToken && !isRepoLoading" class="userRepo">
          <github-card-grid :repoDatas="reposData" />
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
import GithubCardGrid from "@/components/GithubCardGrid.vue";
import Repo from "@/types/RepoType";
@Component({
  components: {
    ContentHolder,
    GithubCard,
    GithubCardGrid
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

  // eslint-disable-next-line
  private pictureData: any;
  private havePicture = false;
  private isPictureLoading = true;

  async getPictureData() {
    UserService.getUserPicture(vxm.user.user.username).then(val => {
      if (!val) {
        this.havePicture = false;
        return;
      }
      this.pictureData = val.img;
      this.havePicture = true;
      this.isPictureLoading = false;
    });
  }

  private reposData: Repo[] = new Array<Repo>();
  //eslint-disable-next-line
  private hasToken = false;
  private isRepoLoading = true;

  async getReposData() {
    UserService.getUserRepos(vxm.user.user.username).then(repos => {
      if (!repos) {
        this.hasToken = false;
        return;
      }
      this.reposData = repos;
      this.hasToken = true;
      this.isRepoLoading = false;
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

  // eslint-disable-next-line
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
