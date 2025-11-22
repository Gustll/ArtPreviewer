<script setup lang="ts">
import { deviceService } from '@/services/device.service';
import FilterToggle from './FilterToggle.vue';
import ModeSwitcher from './ModeSwitcher.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

const navItems = [
    { name: 'Assets', route: '/assets' },
    { name: 'History', route: '/history' },
];
</script>

<template>
    <div
        class="flex flex-row w-100 items-center container-bg shadow-m br-pill app-header">
        <div class="search w-60 h-100 flex flex-row">
            <nav class="flex">
                <RouterLink
                    v-for="item in navItems"
                    :key="item.route"
                    :to="item.route"
                    class="nav-item h-100 br-pill container-bg-light shadow-m text no-underline flex items-center justify-center b-gradient">
                    {{ item.name }}
                </RouterLink>
            </nav>
        </div>

        <div class="w-40 flex justify-end">
            <div
                class="flex flex-row"
                :class="deviceService.isMobile ? 'actions-m' : 'actions'">
                <ModeSwitcher v-if="!deviceService.isMobile" />
                <FilterToggle />
                <ThemeSwitcher />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app-header {
    height: 72px;
    padding: 8px 13px;
    nav {
        gap: 10px;
        .nav-item {
            width: 100px;
        }
        .router-link-active {
            background-color: transparent;
            box-shadow: none;
            border: 2px solid var(--primary);
        }
    }
    .actions {
        gap: 10px;
    }
    .actions-m {
        gap: 1px;
    }
}
</style>
