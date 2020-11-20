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
import Axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
import router from "@/router";
import { propagateEvent } from "@/utils/eventsUtil";

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
      await Axios.post("http://localhost:4000/api/v1/users/register", {
        username: this.username,
        email: this.email,
        password: this.password
      });
    } catch (error) {
      propagateEvent(this, "callSnackbar", "Something went wrong");
      return;
    }
    propagateEvent(this, "callSnackbar", "Successfully registered!");
    router.push("/");
  }

  @Watch("username")
  private onUsernameChanged(value: string) {
    if (!value) return;
    Axios.get(`http://localhost:4000/api/v1/users/check/${value}`)
      .then(res => {
        if (res.status === 200) {
          this.usernameExist = true;
          this.usernameErrors = ["Username exist"];
        } else {
          this.usernameExist = false;
          this.usernameErrors = [];
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  @Watch("email")
  private onEmailChanged(value: string) {
    if (!value) return;
    Axios.get(`http://localhost:4000/api/v1/users/check/${value}`)
      .then(res => {
        if (res.status === 200) {
          this.emailExist = true;
          this.emailErrors = ["email exist"];
        } else {
          this.emailExist = false;
          this.emailErrors = [];
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>

<style scoped></style>
