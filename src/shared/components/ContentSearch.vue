<script setup lang="ts">
import { usePreviewerStore } from '@/stores/asset';
import IconSearch from '../icons/IconSearch.vue';
import { storeToRefs } from 'pinia';

const previewer = usePreviewerStore();
const { filter } = storeToRefs(previewer);
</script>

<template>
    <div
        class="w-100 container-bg-light shadow-m search flex flex-row items-center br-pill pl3">
        <IconSearch />
        <input
            id="search"
            v-model="filter.search"
            type="text"
            class="f7 w-100 h-100 pl2 text-muted bg-transparent bn"
            autocomplete="off"
            placeholder="Search assets..." />
    </div>
</template>

<style lang="scss" scoped>
.search {
    height: 52px;
    & > :first-child {
        fill: var(--gradient);
        width: 26px;
        height: 26px;
    }
    input:focus {
        outline: none;
        box-shadow: none;
    }
}
</style>
