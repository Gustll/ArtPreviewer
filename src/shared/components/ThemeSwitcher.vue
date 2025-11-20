<script setup lang="ts">
import { ref, watchEffect } from 'vue';

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
    <button @click="toggleTheme">
        {{ isLightMode ? 'Switch to Dark' : 'Switch to Light' }}
    </button>

    <div class="card">
        <p>This is a card</p>
        <p class="text-muted">Muted text</p>
    </div>
</template>

<style lang="scss">
.card {
    background: var(--bg);
}
</style>
