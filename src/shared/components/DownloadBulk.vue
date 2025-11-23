<script lang="ts" setup>
const emit = defineEmits(['downloadBulk']);

function downloadBulk() {
    emit('downloadBulk');
}
</script>

<template>
    <div
        class="absolute download-container br-pill container-bg shadow-m pa3 pointer"
        @click="downloadBulk()">
        Download assets
    </div>
</template>

<style scoped lang="scss">
.download-container {
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    border: 2px solid var(--primary);
    transition: all 0.5s ease;
    &:hover {
        background-color: var(--primary);
        color: var(--bg);
    }
}
</style>
