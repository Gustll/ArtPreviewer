import AssetView from '@/views/AssetView.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/assets',
        name: 'assets',
        component: AssetView,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/assets',
    },
];

export default routes;
