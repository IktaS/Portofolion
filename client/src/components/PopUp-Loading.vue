<template>
  <v-dialog v-model="isOn" hide-overlay :width="width">
    <v-card :color="color">
      <v-card-text>
        {{ label }}
        <v-progress-circular indeterminate> </v-progress-circular>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PopUpLoadingDialog extends Vue {
  @Prop({ default: false }) isOn!: boolean;
  @Prop() progress!: number;
  @Prop({ default: "primary" }) color!: string;
  @Prop({ default: "300" }) width!: string;
  @Prop({ default: "Please wait..." }) label!: string;
}
</script>
