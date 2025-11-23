<script setup lang="ts">
import { watchEffect } from 'vue';
import IconGrid from '../icons/IconGrid.vue';
import IconList from '../icons/IconList.vue';
import { usePreviewerStore } from '@/stores/previewer';

const previewer = usePreviewerStore();

function toggleMode() {
    previewer.displayMode = previewer.displayMode === 'grid' ? 'list' : 'grid';
}

const savedMode = localStorage.getItem('display-mode') as 'grid' | 'list';
previewer.displayMode = savedMode;

watchEffect(() => {
    localStorage.setItem('display-mode', previewer.displayMode);
});
</script>

<template>
    <div
        class="theme-switch pointer br-100 flex items-center justify-center"
        @click="toggleMode()">
        <IconGrid v-if="previewer.gridDisplay" />
        <IconList v-else />
    </div>
</template>

<style lang="scss">
.card {
    background: var(--bg);
}

.theme-switch {
    width: 52px;
    height: 52px;
    &:hover {
        box-shadow: var(--shadow-l);
    }
    & > :first-child {
        fill: var(--text);
    }
}
</style>
