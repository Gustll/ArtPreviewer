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
        class="asset-container container-bg-light shadow-m br4 flex flex-row h-auto w-100 justify-between"
        :class="{ active: props.active || isHovered }">
        <div
            class="flex flex-row asset-info pointer"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false">
            <div
                class="img-container overflow-hidden flex items-center justify-center">
                <img
                    :src="asset.thumbnailUrl"
                    :alt="asset.name"
                    class="w-auto h-auto db"
                    loading="lazy" />
            </div>

            <div class="flex justify-center flex-column">
                <div class="truncate flex flex-column">
                    <span class="ttu text-muted">{{ asset.format }}</span>
                    <span class="asset-name f4 fw8">{{ asset.name }}</span>
                </div>
                <div class="pt1">
                    <div class="container-tag dib">
                        {{ asset.gameTag.game }}
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-row asset-actions">
            <div class="action-container flex flex-column h-100 justify-center">
                <button class="action-secondary-btn">more</button>
                <button class="action-btn">Download</button>
            </div>
            <div>
                <IconCheck :active="props.active" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.asset-container {
    padding: 15px;
    border: 2px solid transparent;
    transition: all 0.5s ease;
    &.active {
        border: 2px solid var(--primary);
    }
    .asset-info {
        gap: 10px;
        .img-container {
            width: 200px;
            height: 170px;
            img {
                object-fit: contain;
            }
        }
    }
    .asset-actions {
        .action-container {
            gap: 10px;
        }
    }
}
</style>
