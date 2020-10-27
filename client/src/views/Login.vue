<template>
  <v-container :fill-height="$vuetify.breakpoint.mobile" fluid>
    <v-row
      :align="$vuetify.breakpoint.mobile ? 'center' : 'start'"
      justify="center"
    >
      <v-col :cols="$vuetify.breakpoint.mobile ? '12' : '4'">
        <login-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {}
</script>
