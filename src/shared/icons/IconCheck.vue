<script lang="ts" setup>
interface Props {
    active?: boolean;
    size?: number;
}

const props = defineProps<Props>();
const { active = false, size = 24 } = props;
</script>

<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <!-- Circle background -->
        <circle
            cx="12"
            cy="12"
            r="12"
            :fill="props.active ? 'var(--text)' : 'var(--bg)'" />

        <!-- Check icon -->
        <path
            v-if="props.active"
            class="check-icon"
            fill="var(--bg)"
            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </svg>
</template>

<style scoped>
.circle-bg {
    transition: all 0.2s ease;
}

.check-icon {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
</style>
