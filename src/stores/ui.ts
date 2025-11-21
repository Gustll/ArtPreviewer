
import type { UINotification } from '@/types/ui';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useUIStore = defineStore('ui', () => {
    const notifications = reactive<UINotification[]>([]);

    const hasNotifications = computed(() => notifications.length > 0);

    function addNotification(notification: UINotification): void {
        notifications.push(notification);
    }

    function removeNotification(): void {
        notifications.shift();
    }

    return {
        notifications,
        hasNotifications,
        removeNotification,
        addNotification,
    };
});
