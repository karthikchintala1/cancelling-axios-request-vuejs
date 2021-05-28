import Vue from "vue";
import VueRouter from "vue-router";
import User from "../components/User";
import Users from "../components/Users";

Vue.use(VueRouter);

const routers = [
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
  base: process.env.BASE_URL,
  routes: routers
});

export default router;
