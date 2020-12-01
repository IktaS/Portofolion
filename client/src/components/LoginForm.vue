<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-row justify="center">
          <v-col cols="11">
            <h1>Login to Portofolion</h1>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :error-messages="usernameErrors"
              label="Username or Email"
              outlined
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              label="Password"
              outlined
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col :cols="$vuetify.breakpoint.mobile ? '10' : '4'">
            <v-btn label="Login" block outlined @click="login">Login</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row justify="center">
        <v-col :cols="$vuetify.breakpoint.mobile ? '10' : '4'">
          <v-btn label="Sign Up" text x-small block to="/signup">
            Sign Up
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import router from "@/router";
import UserApi from "@/services/UserService";
import { vxm } from "@/store/store.vuex";
import { Debounce } from "@/utils/eventsUtil";

@Component
export default class LoginForm extends Vue {
  private valid = null;

  private username = "";
  private usernameRules = [(v: string) => !!v || "Username is required"];
  private usernameExist = true;
  private usernameErrors: string[] = [];

  private checkUsername(value: string) {
    if (!value) return;
    UserApi.check(value).then(value => {
      if (value.message !== undefined) {
        this.usernameExist = true;
        this.usernameErrors = [];
      } else {
        this.usernameExist = false;
        this.usernameErrors = ["Username does not exist"];
      }
    });
  }

  private usernameDebouncer = new Debounce(this.checkUsername, 300);

  private password = "";
  private show = false;

  public async login() {
    if (!this.valid) {
      //eslint-disable-next-line
      const form: any = this.$refs.form;
      form.validate();
      return;
    }
    vxm.user.login({ username: this.username, password: this.password });
    setTimeout(() => router.push("/dashboard"), 1000);
  }

  @Watch("username")
  private onUsernameChanged(value: string) {
    this.usernameDebouncer.trigger(value);
  }
}
</script>

<style scoped></style>
