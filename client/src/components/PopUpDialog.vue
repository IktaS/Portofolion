<template>
  <v-dialog v-model="isOn" hide-overlay :width="width">
    <v-card :color="color" :height="height">
      <v-card-text>
        {{ message }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PopUpDialog extends Vue {
  @Prop({ default: "primary" }) color!: string;
  @Prop({ default: "100" }) width!: string;
  @Prop({ default: "100" }) height!: string;
  @Prop() message!: string;

  private isOn = false;

  public close() {
    this.isOn = false;
  }
  public open() {
    this.isOn = true;
  }
}
</script>

<style scoped></style>
