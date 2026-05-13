import { createRouter, createWebHistory } from "vue-router";

import RectangleMove from "../games/RectangleMove.vue";
import Room from "../games/Room.vue";

const routes = [
  { path: "/", component: Room },
  { path: "/RectangleMove", component: RectangleMove },
  { path: "/Room", component: Room }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;