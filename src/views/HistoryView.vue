<script setup lang="ts">
import GridAsset from '@/shared/components/GridAsset.vue';
import ListAsset from '@/shared/components/ListAsset.vue';
import IconLoader from '@/shared/icons/IconLoader.vue';
import { usePreviewerStore } from '@/stores/previewer';
import { onMounted, ref } from 'vue';

const previewer = usePreviewerStore();

const activeAssets = ref<number[]>([]);

onMounted(() => {
    previewer.fetchHistory();
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
</script>

<template>
    <IconLoader v-if="previewer.loading.history" />
    <div
        v-else-if="previewer.history.length === 0"
        class="flex w-100 h-100 items-center justify-center fw8 f3">
        <span class="">No history with the given filter</span>
    </div>
    <div
        v-else
        class="w-100 h-100 flex assets-container"
        :class="previewer.gridDisplay ? 'flex-wrap' : 'flex-column'">
        <div
            v-for="asset in previewer.history"
            @click="toggleAsset(asset.id)">
            <GridAsset
                :asset="asset"
                :active="assetActive(asset.id)"
                v-if="previewer.gridDisplay" />
            <ListAsset
                :asset="asset"
                :active="assetActive(asset.id)"
                v-else />
        </div>
    </div>
</template>

<style>
.assets-container {
    gap: 10px;
}
</style>
