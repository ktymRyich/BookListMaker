import Vue from "vue";
import VueRouter from "vue-router";
import Preview from "../components/Preview.vue";
import SearchBook from "../components/SearchBook.vue";
import BookList from "../components/BookList.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: SearchBook,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/preview",
        name: "Book details",
        component: Preview,
    },
    {
        path: "/booklist",
        name: "BookList",
        component: BookList,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
