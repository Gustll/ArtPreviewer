<script setup lang="ts">
import AppHeader from './shared/components/AppHeader.vue';
import AppNotification from './shared/components/AppNotification.vue';
import AppSidebar from './shared/components/AssetFilter.vue';
</script>

<template>
    <div
        id="app"
        class="w-100 relative">
        <div class="vh-100 flex flex-column pa3">
            <AppHeader />
            <div class="flex flex-row w-100 h-100 content overflow-y-hidden">
                <div class="w-30">
                    <AppSidebar />
                </div>
                <div class="w-70 container-bg shadow-m br4 pa3">
                    <router-view />
                </div>
            </div>
        </div>
        <AppNotification />
    </div>
</template>

<style scoped lang="scss">
$gap: 30px;

#app {
    overflow-y: hidden;
    & > :first-child {
        gap: $gap;
    }
    .content {
        gap: $gap;
    }
}
</style>
