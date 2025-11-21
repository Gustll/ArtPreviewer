<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { assetService } from '@/services/asset.service';
import type { GameTagResponse } from '@/types/asset';
import { usePreviewerStore } from '@/stores/previewer';
import { storeToRefs } from 'pinia';

const previewer = usePreviewerStore();

const gameTags = ref<GameTagResponse[]>([]);

onMounted(async () => {
    const tags = await assetService.getGameTags();
    if (tags) {
        gameTags.value = tags;
    }
});

function toggleGameTag({ id, game }: GameTagResponse) {
    if (id in previewer.filter.gameTags) {
        delete previewer.filter.gameTags[id];
    } else {
        previewer.filter.gameTags[id] = game;
    }

    previewer.fetchAssets();
}

function tagActive(id: number): boolean {
    return id in previewer.filter.gameTags;
}
</script>

<template>
    <div class="w-100 h-100 flex flex-column">
        <span class="text fw8 f3 pb3">Game</span>
        <div
            class="flex flex-wrap container-bg-light shadow-m br4 game-tag-container pa2">
            <div v-for="tag in gameTags">
                <div>
                    <div
                        class="container-tag hover-tag dib pointer"
                        :class="{ active: tagActive(tag.id) }"
                        @click="toggleGameTag(tag)">
                        {{ tag.game }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" ts>
.game-tag-container {
    height: 180px;
    gap: 5px;

    .active {
        color: var(--bg-dark);
        background-color: var(--primary);
        border: 2px solid var(--primary);
        box-shadow: none;
    }
}
</style>
