import Vue from "vue";
import Vuex from "vuex";
import { createProxy, extractVuexModule } from "vuex-class-component";
import { EventStore } from "./event.vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { ...extractVuexModule(EventStore) }
});

export const vxm = {
  event: createProxy(store, EventStore)
};

export default store;
