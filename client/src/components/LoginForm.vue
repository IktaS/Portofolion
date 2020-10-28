<template>
  <v-card>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <h1>Login to Portofolion</h1>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field label="Username or Email" outlined> </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field label="Password" outlined> </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col :cols="$vuetify.breakpoint.mobile ? '12' : '4'">
            <v-btn label="Login" block outlined>Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginForm extends Vue {
  private valid = null;
}
</script>

<style scoped></style>
