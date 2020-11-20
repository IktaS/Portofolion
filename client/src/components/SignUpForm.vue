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
            <v-btn @click="submit" label="signup" block outlined>Sign Up</v-btn>
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
import router from "@/router";
import Axios from "axios";
import { Component, Vue } from "vue-property-decorator";

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

  public async submit() {
    if (!this.valid) {
      return;
    }
    const res = await Axios.post("http://localhost:4000/api/v1/user/register", {
      username: this.username,
      email: this.email,
      password: this.password
    });
    if (res.status == 200) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  }
}
</script>

<style scoped></style>
