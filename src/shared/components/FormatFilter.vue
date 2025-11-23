<script setup lang="ts">
import { onMounted } from 'vue';
import { assetService } from '@/services/asset.service';
import type { FormatResponse } from '@/types/asset';
import { usePreviewerStore } from '@/stores/previewer';

const previewer = usePreviewerStore();

onMounted(async () => {
    if (previewer.assetFormats.length === 0) {
        const tags = await assetService.getAssetFormats();
        if (tags) {
            previewer.assetFormats = tags;
        }
    }
});

function toggleFormat({ id, type }: FormatResponse) {
    if (id in previewer.filter.format) {
        delete previewer.filter.format[id];
    } else {
        previewer.filter.format[id] = type;
    }

    previewer.fetchAssets();
}

function tagActive(id: number): boolean {
    return id in previewer.filter.format;
}
</script>

<template>
    <div class="w-100 h-100 flex flex-column">
        <span class="text fw8 f3 pb3">Format</span>
        <div
            class="flex flex-wrap container-bg-light shadow-m br4 format-tag-container pa2 overflow-y-auto">
            <div
                :key="format.id"
                v-for="format in previewer.assetFormats"
                class="container-tag hover-tag dib pointer"
                :class="{ active: tagActive(format.id) }"
                @click="toggleFormat(format)">
                {{ format.type }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.format-tag-container {
    max-height: 180px;
    gap: 5px;

    & > div {
        height: 31px;
    }
    .active {
        color: var(--bg-dark);
        background-color: var(--primary);
        border: 2px solid var(--primary);
        box-shadow: none;
    }
}
</style>
