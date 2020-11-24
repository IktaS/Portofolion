import { createModule, mutation, action } from "vuex-class-component";
import AuthApi from "@/services/AuthService";
import User, { emptyUser } from "@/types/UserType";
import { vxm } from "./store.vuex";

const VuexModule = createModule({
  namespaced: "user",
  strict: false
});

interface LoginInfo {
  username: string;
  password: string;
}

export class UserStore extends VuexModule {
  public user: User = emptyUser;

  @mutation setUser(user: User) {
    this.user = user;
  }

  @mutation clearUser() {
    this.user = emptyUser;
  }

  @action async login(payload: LoginInfo) {
    try {
      const res = await AuthApi.login(payload.username, payload.username);
      this.user = res;
      vxm.event.showSnackbar("Successfully Logged In!");
    } catch (error) {
      this.user = emptyUser;
      vxm.event.showSnackbar("Something went wrong");
    }
  }

  @action async logout() {
    try {
      await AuthApi.logout();
      this.user = emptyUser;
    } catch (error) {
      console.error(error);
    }
  }
}
