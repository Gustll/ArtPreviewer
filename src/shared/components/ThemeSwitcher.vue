<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import IconLight from '../icons/IconLight.vue';
import IconDark from '../icons/IconDark.vue';

const isLightMode = ref(false);

// Toggle body class
function toggleTheme() {
    isLightMode.value = !isLightMode.value;
    document.body.classList.toggle('light', isLightMode.value);
}

// Optional: save theme in localStorage
watchEffect(() => {
    localStorage.setItem('theme', isLightMode.value ? 'light' : 'dark');
});

// Optional: load saved theme on mount
if (localStorage.getItem('theme') === 'light') {
    isLightMode.value = true;
    document.body.classList.add('light-mode');
}
</script>

<template>
    <div
        class="theme-switch pointer br-100 container-bg-light flex items-center justify-center shadow-m"
        @click="toggleTheme()">
        <IconDark v-if="isLightMode" />
        <IconLight v-else />
    </div>
</template>

<style lang="scss">
.card {
    background: var(--bg);
}

.theme-switch {
    width: 52px;
    height: 52px;
    &:hover {
        box-shadow: var(--shadow-l);
    }
    & > :first-child {
        fill: var(--text);
    }
}
</style>
