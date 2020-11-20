<template>
  <v-card>
    <v-container>
      <pop-up-dialog
        :isOn="dialogData.isOn"
        :color="dialogData.color"
        :label="dialogData.label"
        :width="dialogData.width"
        :message="dialogData.message"
        ref="dialog"
      >
      </pop-up-dialog>
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
import { Component, Vue } from "vue-property-decorator";
import PopUpDialog from "@/components/PopUpDialog.vue";
import router from "@/router";

@Component({
  components: {
    PopUpDialog
  }
})
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
    //eslint-disable-next-line
    const dialog: any = this.$refs.dialog;
    dialog.open();
    try {
      await Axios.post("http://localhost:4000/api/v1/user/register", {
        username: this.username,
        email: this.email,
        password: this.password
      });
    } catch (error) {
      this.dialogData.color = "error";
      this.dialogData.message = "Username or email exist";
      return;
    }
    router.push("/");
  }
}
</script>

<style scoped></style>
