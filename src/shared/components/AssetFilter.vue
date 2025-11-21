<script setup lang="ts">
import ContentSearch from './AssetSearch.vue';
import GameFilter from './GameFilter.vue';
</script>

<template>
    <div
        class="w-100 h-100 flex flex-column container-bg shadow-m br4 pa3 filter-container">
        <ContentSearch />
        <GameFilter />
    </div>
</template>

<style scoped lang="scss">
.filter-container {
    gap: 20px;
}
</style>
