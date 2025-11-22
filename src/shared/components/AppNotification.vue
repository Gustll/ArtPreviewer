<script setup lang="ts">
import { useUIStore } from '@/stores/ui';

const ui = useUIStore();
</script>
<template>
    <div
        class="absolute notification-container"
        v-if="ui.hasNotifications">
        <div
            :class="ui.notifications[0]?.type"
            class="pv2 ph3 br-pill">
            <span>{{ ui.notifications[0]?.message }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notification-container {
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    .error {
        background-color: red;
        color: var(--bg);
    }
    .action {
        border: 2px solid var(--primary);
        box-shadow: var(--shadow-m);
        background-color: var(--bg-light);
        color: var(--text);
    }
}
</style>
