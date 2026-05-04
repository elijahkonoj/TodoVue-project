import { createRouter, createWebHistory } from "vue-router";
import TodosView from "../views/TodosView.vue";
import NotFound from "../views/NotFound.vue";
const routes = [
    {
        path: "/",
        redirect: "/tasks",
    },
    {
        path: "/tasks",
        name: "tasks",
        component: TodosView,
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
