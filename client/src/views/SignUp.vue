<template>
  <v-container :fill-height="$vuetify.breakpoint.mobile" fluid>
    <v-row
      :align="$vuetify.breakpoint.mobile ? 'center' : 'start'"
      justify="center"
    >
      <v-col :cols="$vuetify.breakpoint.mobile ? '12' : '4'">
        <sign-up-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignUpForm from "@/components/SignUpForm.vue";

@Component({
  components: {
    SignUpForm
  }
})
export default class SignUp extends Vue {}
</script>
