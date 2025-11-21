<script setup lang="ts">
import type { Asset } from '@/types/asset';
import IconCheck from '../icons/IconCheck.vue';
import { ref } from 'vue';

interface Props {
    asset: Asset;
    loading?: boolean;
    active?: boolean;
}

const isHovered = ref(false);
const props = withDefaults(defineProps<Props>(), {
    loading: false,
    active: false,
});
</script>

<template>
    <div
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        class="asset-container container-bg-light shadow-m br4 flex flex-column h-auto"
        :class="{ active: props.active || isHovered }">
        <div class="flex flex-row justify-between">
            <div
                class="img-container overflow-hidden flex items-center justify-center">
                <img
                    :src="asset.thumbnailUrl"
                    :alt="asset.name"
                    class="w-auto h-auto db"
                    loading="lazy" />
            </div>
            <div class="flex justify-end">
                <IconCheck :active="active" />
            </div>
        </div>

        <div class="truncate flex flex-column">
            <span class="ttu text-muted">{{ asset.format }}</span>
            <span class="asset-name f4 fw8">{{ asset.name }}</span>
        </div>
        <div>
            <div class="container-tag dib">
                {{ asset.gameTag }}
            </div>
        </div>
        <div class="action-container flex flex-row">
            <button class="w-50 action-secondary-btn">more</button>
            <button class="w-50 action-btn">Download</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.asset-container {
    width: 250px;
    padding: 15px;
    gap: 15px;
    border: 2px solid transparent;
    transition: all 0.5s ease;
    &.active {
        border: 2px solid var(--primary);
    }
    .img-container {
        width: 180px;
        height: 150px;
        img {
            object-fit: contain;
        }
    }
    .action-container {
        gap: 10px;
    }
}
</style>
