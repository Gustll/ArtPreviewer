<script lang="ts" setup>
import { usePreviewerStore } from '@/stores/previewer';
import type { AssetResponse } from '@/types/asset';
import { ref, watch } from 'vue';
import IconLoader from '../icons/IconLoader.vue';

const emit = defineEmits(['close']);
const previewer = usePreviewerStore();

interface Props {
    assetId: number | null;
}
const props = withDefaults(defineProps<Props>(), {
    assetId: null,
});

const asset = ref<AssetResponse | null>(null);

function close() {
    emit('close');
    asset.value = null;
}

watch(
    () => props.assetId,
    async (newId) => {
        if (newId !== null) {
            const assetResponse = await previewer.fetchAsset(newId);
            asset.value = assetResponse;
        }
    },
);
</script>

<template>
    <transition name="slide-right">
        <div
            v-if="props.assetId"
            class="absolute right-0 top-0 h-100 w-100 flex more-container">
            <div
                class="container-bg-dark w-40 h-100"
                @click="close()"></div>
            <div class="w-60 h-100 relative more-content container-bg b4 pa3">
                <IconLoader v-if="asset === null" />
                <div
                    v-else
                    class="flex justify-between flex-column h-100">
                    <div>
                        <div
                            class="img-container overflow-hidden flex items-center justify-center pb3">
                            <img
                                :src="asset.thumbnailUrl"
                                :alt="asset.name"
                                class="w-auto h-auto db"
                                loading="lazy" />
                        </div>
                        <div class="truncate flex flex-column">
                            <span class="ttu text-muted">{{
                                asset.format.type
                            }}</span>
                            <span class="asset-name f4 fw8">{{
                                asset.name
                            }}</span>
                        </div>
                        <div class="pb3">
                            <div class="container-tag dib">
                                {{ asset.gameTag.game }}
                            </div>
                        </div>
                        <div class="flex flex-column">
                            <span><b>By:</b> {{ asset.author }}</span>
                            <span
                                ><b>Dimensions:</b> {{ asset.dimensions }}</span
                            >
                            <span><b>File Size:</b> {{ asset.size }}</span>
                            <span
                                ><b>Downloaded:</b> {{ asset.datePosted }}</span
                            >
                        </div>
                    </div>
                    <div class="action-container flex flex-row">
                        <button
                            class="w-50 action-secondary-btn"
                            @click="close()">
                            close
                        </button>
                        <button
                            class="w-50 action-btn"
                            @click="previewer.downloadAssets([asset.assetId])">
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.more-container {
    & > :first-child {
        opacity: 0.9;
    }
    .more-content {
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;

        .img-container {
            height: 250px;
            img {
                object-fit: contain;
            }
        }
    }
}

/* ENTER: slide from right to left */
.slide-right-enter-from {
    transform: translateX(100%); /* start off-screen to the right */
    opacity: 0;
}

.slide-right-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-right-enter-active {
    transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
}

/* LEAVE: slide from left to right */
.slide-right-leave-from {
    transform: translateX(0);
    opacity: 1;
}
.slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
.slide-right-leave-active {
    transition:
        transform 0.6s ease-in,
        opacity 0.6s ease-in;
}
</style>
