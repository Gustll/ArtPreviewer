import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('header', () => {
    const filter = reactive({
        search: ''
    })

    return { filter };
});
