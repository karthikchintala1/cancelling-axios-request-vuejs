import Vue from "vue";
import VueRouter from "vue-router";
import User from "../components/User";
import Users from "../components/Users";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Cancellation",
    component: User,
  },
  {
    path: "/users",
    name: "Cancellation with Vuex",
    component: Users
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
