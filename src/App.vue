<script setup lang="ts">
import { deviceService } from './services/device.service';
import AppHeader from './shared/components/AppHeader.vue';
import AppNotification from './shared/components/AppNotification.vue';
import AppSidebar from './shared/components/AssetFilter.vue';
import { usePreviewerStore } from './stores/previewer';

const previewer = usePreviewerStore();
</script>

<template>
    <div
        id="app"
        class="w-100 relative">
        <div class="vh-100 flex flex-column pa3">
            <AppHeader />
            <div
                class="flex flex-row w-100 h-100 content overflow-y-hidden relative">
                <template v-if="deviceService.isMobile">
                    <div
                        v-if="previewer.showFilter"
                        class="w-100 h-100 absolute z-999">
                        <AppSidebar />
                    </div>
                    <div class="container-bg shadow-m br4 pa3 w-100">
                        <router-view /></div
                ></template>
                <template v-else>
                    <div
                        v-if="previewer.showFilter"
                        :class="previewer.showFilter ? 'w-30' : 'w-100'">
                        <AppSidebar />
                    </div>
                    <div
                        class="container-bg shadow-m br4 pa3 relative"
                        :class="previewer.showFilter ? 'w-70' : 'w-100'">
                        <router-view /></div
                ></template>
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
