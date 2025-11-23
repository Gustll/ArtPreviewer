<script setup lang="ts">
import { deviceService } from '@/services/device.service';
import AssetMore from '@/shared/components/AssetMore.vue';
import DownloadBulk from '@/shared/components/DownloadBulk.vue';
import GridAsset from '@/shared/components/GridAsset.vue';
import ListAsset from '@/shared/components/ListAsset.vue';
import IconLoader from '@/shared/icons/IconLoader.vue';
import { usePreviewerStore } from '@/stores/previewer';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const previewer = usePreviewerStore();

const activeAssets = ref<number[]>([]);
const showMore = ref<number | null>(null);

const route = useRoute();

// reactive mode from the current route
const mode = computed(() => route.name);

onMounted(() => {
    if (mode.value === 'history') {
        previewer.fetchHistory();
    } else {
        previewer.fetchAssets();
    }
});

watch(
    () => route.fullPath,
    (newMode) => {
        if (newMode === '/history') {
            previewer.fetchHistory();
        } else {
            previewer.fetchAssets();
        }
        activeAssets.value = [];
    },
);

const assets = computed(() =>
    mode.value === 'history' ? previewer.history : previewer.assets,
);

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

async function downloadBulk() {
    // User saved the file, now record the download
    await previewer.downloadAssets(activeAssets.value);
    activeAssets.value = [];
}

function toggleShowMore(assetId: number | null) {
    if (showMore.value) {
        showMore.value = null;
    } else {
        showMore.value = assetId;
    }
}
</script>

<template>
    <div
        v-if="assets.length === 0 && !previewer.loading"
        class="flex w-100 h-100 items-center justify-center fw8 f3">
        <span class="">No assets with the given filter</span>
    </div>
    <div
        v-else
        class="w-100 h-100 flex assets-container relative overflow-y-auto br4"
        :class="[
            previewer.gridDisplay ? 'flex-wrap' : 'flex-column',
            deviceService.isMobile ? 'justify-center' : '',
        ]">
        <IconLoader v-if="previewer.loading" />
        <div
            v-for="asset in assets"
            :key="asset.id">
            <GridAsset
                @show-more="toggleShowMore"
                @toggle-asset="toggleAsset(asset.assetId)"
                @download-asset="downloadAsset([asset.assetId])"
                :asset="asset"
                :active="assetActive(asset.assetId)"
                v-if="previewer.gridDisplay || deviceService.isMobile" />
            <ListAsset
                @show-more="toggleShowMore"
                @toggle-asset="toggleAsset(asset.assetId)"
                @download-asset="downloadAsset([asset.assetId])"
                :asset="asset"
                :active="assetActive(asset.assetId)"
                v-else />
        </div>
    </div>

    <AssetMore
        :assetId="showMore"
        @close="toggleShowMore(null)" />
    <DownloadBulk
        v-if="activeAssets.length > 1"
        @download-bulk="downloadBulk()" />
</template>

<style>
.assets-container {
    min-height: 0;
    gap: 10px;
}
</style>
