<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { assetService } from '@/services/asset.service';
import type { FormatResponse } from '@/types/asset';
import { usePreviewerStore } from '@/stores/previewer';

const previewer = usePreviewerStore();

const assetFormats = ref<FormatResponse[]>([]);

onMounted(async () => {
    const tags = await assetService.getAssetFormats();
    if (tags) {
        assetFormats.value = tags;
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
            class="flex flex-wrap container-bg-light shadow-m br4 game-tag-container pa2">
            <div
                v-for="format in assetFormats"
                class="container-tag hover-tag dib pointer"
                :class="{ active: tagActive(format.id) }"
                @click="toggleFormat(format)">
                {{ format.type }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" ts>
.game-tag-container {
    height: 180px;
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
