import { createModule, mutation, action } from "vuex-class-component";

const VuexModule = createModule({
  namespaced: "event",
  strict: false
});

interface Snackbar {
  show: boolean;
  message: string;
}

export class EventStore extends VuexModule {
  public snackbar: Snackbar = {
    show: false,
    message: ""
  };

  @mutation setSnackbar(snackbar: Snackbar) {
    this.snackbar = snackbar;
  }

  @action async showSnackbar(payload: string) {
    this.setSnackbar({ show: true, message: payload });

    setTimeout(() => this.setSnackbar({ show: false, message: "" }), 2000);
  }
}
