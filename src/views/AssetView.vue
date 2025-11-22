<script setup lang="ts">
import GridAsset from '@/shared/components/GridAsset.vue';
import ListAsset from '@/shared/components/ListAsset.vue';
import IconLoader from '@/shared/icons/IconLoader.vue';
import { usePreviewerStore } from '@/stores/previewer';
import { onMounted, ref } from 'vue';

const previewer = usePreviewerStore();

const activeAssets = ref<number[]>([]);

onMounted(() => {
    previewer.fetchAssets();
});

function toggleAsset(id: number) {
    const index = activeAssets.value.indexOf(id);
    if (index === -1) {
        // ID not in array → add it
        activeAssets.value.push(id);
    } else {
        // ID already in array → remove it
        activeAssets.value.splice(index, 1);
    }
}

function assetActive(id: number): boolean {
    return activeAssets.value.includes(id);
}

async function downloadAsset(ids: number[]) {
    // User saved the file, now record the download
    await previewer.downloadAssets(ids);
    activeAssets.value = [];
}
</script>

<template>
    <div
        v-if="previewer.assets.length === 0 && !previewer.loading.assets"
        class="flex w-100 h-100 items-center justify-center fw8 f3">
        <span class="">No assets with the given filter</span>
    </div>
    <div
        v-else
        class="w-100 h-100 flex assets-container relative overflow-y-auto br4"
        :class="previewer.gridDisplay ? 'flex-wrap' : 'flex-column'">
        <IconLoader v-if="previewer.loading.assets" />
        <div
            v-for="asset in previewer.assets"
            @click="toggleAsset(asset.id)">
            <GridAsset
                @download-asset="downloadAsset([asset.id])"
                :asset="asset"
                :active="assetActive(asset.id)"
                v-if="previewer.gridDisplay" />
            <ListAsset
                @download-asset="downloadAsset([asset.id])"
                :asset="asset"
                :active="assetActive(asset.id)"
                v-else />
        </div>
    </div>
</template>

<style>
.assets-container {
    min-height: 0;
    gap: 10px;
}
</style>
