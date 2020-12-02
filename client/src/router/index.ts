import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import About from "@/views/About.vue";
import SignUp from "@/views/SignUp.vue";
import OAuthRedirect from "@/components/oauth/oauthRedirect.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/oauth/redirect",
    name: "redirectOauth",
    component: OAuthRedirect
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
