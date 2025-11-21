import AssetView from '@/views/AssetView.vue';
import HistoryView from '@/views/HistoryView.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/history',
        name: 'history',
        component: HistoryView,
    },
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
