import Vue from "vue";
import Vuex from "vuex";
import { createProxy, extractVuexModule } from "vuex-class-component";
import { EventStore } from "./event.vuex";
import { UserStore } from "./user.vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { ...extractVuexModule(EventStore), ...extractVuexModule(UserStore) }
});

export const vxm = {
  event: createProxy(store, EventStore),
  user: createProxy(store, UserStore)
};

export default store;
