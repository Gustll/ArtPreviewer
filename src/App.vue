<script setup lang="ts">
import AppHeader from './shared/components/AppHeader.vue';
import AppSidebar from './shared/components/AppSidebar.vue';
</script>

<template>
    <div
        id="app"
        class="w-100">
        <div class="vh-100 flex flex-column pa3">
            <AppHeader />
            <div class="flex flex-row w-100 h-100">
                <div class="w-30">
                    <AppSidebar />
                </div>
                <div class="w-70"><router-view /></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#app > :first-child {
    gap: 30px;
}
</style>
