<script setup lang="ts">
import { usePreviewerStore } from '@/stores/asset';
import { onMounted } from 'vue';

const previewer = usePreviewerStore();

onMounted(() => {
    previewer.fetchAssets();
});
</script>

<template>
    <div class="w-100">
        {{ previewer.assets }}
    </div>
</template>
