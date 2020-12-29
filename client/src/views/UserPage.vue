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
                <h1>{{ userFullname }}</h1>
              </v-col>
            </v-row>
            <v-row v-if="!userDataLoadingStatus">
              <v-col align="start">
                <p class="body-1">{{ userData.description }}</p>
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
                <h1>{{ userFullname }}</h1>
              </v-col>
            </v-row>
            <v-row v-if="!userDataLoadingStatus">
              <v-col align="center">
                <p class="body-1">{{ userData.description }}</p>
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
            <p>This user hasn't connected their github account yet :c</p>
          </v-col>
        </v-row>
        <div v-if="hasToken && !isRepoLoading" class="userRepo">
          <github-card-grid
            :repoDatas="reposData"
            :hasSearch="false"
            :showVisibility="false"
          />
        </div>
      </v-container>
    </content-holder>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import UserService from "@/services/UserService";
import ContentHolder from "@/components/ContentHolder.vue";
import { Component, Vue } from "vue-property-decorator";
import User, { emptyUser } from "@/types/UserType";
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
export default class UserPage extends Vue {
  private userData: User = emptyUser;
  //eslint-disable-next-line
  private userDataLoadingStatus: boolean = true;

  async getUserData() {
    UserService.getUser(this.$route.params.id)
      .then(user => {
        if (!user) {
          router.push("/error/404");
          return;
        }
        this.userDataLoadingStatus = false;
        this.userData = user;
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
    UserService.getUserPicture(this.userData.username).then(val => {
      if (!val) {
        this.havePicture = false;
        this.isPictureLoading = false;
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
    UserService.getRecentUserRepos(this.userData.username)
      .then(repos => {
        if (!repos) {
          this.hasToken = false;
          this.isRepoLoading = false;
          return;
        }
        this.reposData = repos;
        this.hasToken = true;
        this.isRepoLoading = false;
      })
      .catch(() => {
        this.hasToken = false;
        return;
      });
  }

  mounted() {
    this.getUserData();
  }

  get userFullname() {
    return `${this.userData.firstName} ${this.userData.lastName}`;
  }
}
</script>
