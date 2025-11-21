<script setup lang="ts">
import GridAsset from '@/shared/components/GridAsset.vue';
import ListAsset from '@/shared/components/ListAsset.vue';
import { usePreviewerStore } from '@/stores/previewer';
import { computed, onMounted, ref } from 'vue';

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
</script>

<template>
    <div
        class="w-100 flex w-100 assets-container"
        :class="previewer.gridDisplay ? 'flex-wrap' : 'flex-column'">
        <div
            v-for="asset in previewer.assets"
            class="pointer"
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
