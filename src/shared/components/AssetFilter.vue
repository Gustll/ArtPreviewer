<script setup lang="ts">
import ContentSearch from './AssetSearch.vue';
import FormatFilter from './FormatFilter.vue';
import GameFilter from './GameFilter.vue';
</script>

<template>
    <div class="w-100 h-100 container-bg shadow-m br4 pa3">
        <div class="flex flex-column filter-container overflow-y-auto h-100">
            <ContentSearch />
            <GameFilter />
            <FormatFilter />
        </div>
    </div>
</template>

<style scoped lang="scss">
.filter-container {
    gap: 20px;
    min-height: 0;
}
</style>
