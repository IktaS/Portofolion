<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-row justify="center">
          <v-col cols="11">
            <h1>Sign Up to Portofolion</h1>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :error-messages="usernameErrors"
              label="Username"
              outlined
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :error-messages="emailErrors"
              label="Email"
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
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              label="Password"
              outlined
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-text-field
              v-model="confirm_password"
              :rules="[password === confirm_password || 'Password must match']"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              label="Confirm Password"
              outlined
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col :cols="$vuetify.breakpoint.mobile ? '10' : '4'">
            <v-btn @click.stop="submit" label="signup" block outlined>
              Sign Up
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row justify="center">
        <v-col :cols="$vuetify.breakpoint.mobile ? '10' : '4'">
          <v-btn label="login" text x-small block to="/login"> Login </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import router from "@/router";
import AuthApi from "@/services/AuthService";
import UserApi from "@/services/UserService";
import { vxm } from "@/store/store.vuex";

@Component
export default class SignUpForm extends Vue {
  private valid = null;
  private username = "";
  private usernameRules = [(v: string) => !!v || "Username is required"];
  private email = "";
  private emailRules = [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "Must be a valid e-mail"
  ];
  private password = "";
  private show1 = false;
  private passwordRules = [(v: string) => !!v || "Password is required"];
  private confirm_password = "";
  private show2 = false;

  private usernameExist = true;
  private usernameErrors: string[] = [];
  private emailExist = true;
  private emailErrors: string[] = [];

  private firstName = "";
  private lastName = "";

  private dialogData = {
    isOn: false,
    color: "primary",
    width: "300",
    label: "Signing in...",
    message: "Signed Up!"
  };

  public async submit() {
    if (!this.valid) {
      //eslint-disable-next-line
      const form: any = this.$refs.form;
      form.validate();
      return;
    }
    try {
      await AuthApi.register(
        this.firstName,
        this.lastName,
        this.username,
        this.email,
        this.password
      );
    } catch (error) {
      vxm.event.showSnackbar("Something went wrong!");
      return;
    }
    vxm.event.showSnackbar("Successfully registered!");
    router.push("/login");
  }

  @Watch("username")
  private onUsernameChanged(value: string) {
    if (!value) return;
    UserApi.check(value).then(value => {
      if (value.message !== undefined) {
        this.usernameExist = true;
        this.usernameErrors = ["Username exist"];
      } else {
        this.usernameExist = false;
        this.usernameErrors = [];
      }
    });
  }

  @Watch("email")
  private onEmailChanged(value: string) {
    if (!value) return;
    UserApi.check(value).then(value => {
      if (value.message !== undefined) {
        this.emailExist = true;
        this.emailErrors = ["Email exist"];
      } else {
        this.emailExist = false;
        this.emailErrors = [];
      }
    });
  }
}
</script>

<style scoped></style>
