<script setup lang="ts">
import { watchEffect } from 'vue';
import { usePreviewerStore } from '@/stores/previewer';
import IconMenuOpen from '../icons/IconMenuOpen.vue';
import IconMenuClose from '../icons/IconMenuClose.vue';

const previewer = usePreviewerStore();

function toggleFilter() {
    previewer.filter.visible = !previewer.filter.visible;
}

const savedMode = localStorage.getItem('display-mode') as 'grid' | 'list';
previewer.displayMode = savedMode;

watchEffect(() => {
    localStorage.setItem('display-mode', previewer.displayMode);
});
</script>

<template>
    <div
        class="filter-switch pointer br-100 flex items-center justify-center"
        @click="toggleFilter()">
        <IconMenuOpen v-if="!previewer.showFilter" />
        <IconMenuClose v-else />
    </div>
</template>

<style lang="scss">
.card {
    background: var(--bg);
}

.filter-switch {
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
