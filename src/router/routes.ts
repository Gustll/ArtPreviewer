import MainView from '@/views/MainView.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/history',
        name: 'history',
        component: MainView,
    },
    {
        path: '/assets',
        name: 'assets',
        component: MainView,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/assets',
    },
];

export default routes;
