<template>
  <div>
    <h1>Redirecting back...</h1>
  </div>
</template>

<script lang="ts">
import UserService from "@/services/UserService";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OAuthRedirect extends Vue {
  mounted() {
    const code = this.$route.query.code as string;
    UserService.saveToken(code).then(() =>
      setTimeout(() => this.$router.push("/dashboard"), 300)
    );
  }
}
</script>
