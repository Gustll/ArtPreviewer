import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { assetService } from '@/services/asset.service';
import type { AssetResponse } from '@/types/asset';
import { isErrorResponse } from '@/types/api';
import { useUIStore } from './ui';
import { NotificationType } from '@/types/ui';

export const usePreviewerStore = defineStore('previewer', () => {
    const ui = useUIStore();
    const filter = reactive({
        search: '',
        gameTag: '',
        format: ''
    })

    const assets = ref<AssetResponse[]>([]);
    const history = [];

    const loading = reactive({
        assets: false,
        history: true
    })

    const error = reactive({
        assets: false,
        history: false
    })

    async function fetchAssets() {
        loading.assets = true;

        try {
            assets.value = await assetService.listAssets(filter);
        } catch (e) {
            // Store catches and handles ApiError
            error.assets = true
            if (isErrorResponse(e)) {
                ui.addNotification({ message: `${e.error.statusCode}: ${e.error.message}`, type: NotificationType.Error })
            } else {
                ui.addNotification({ message: 'An unexpected error occurred on assets', type: NotificationType.Error })
            }
            console.error('Failed to fetch assets:', e);
        } finally {
            loading.assets = false;
        }
    }

    return { filter, assets, fetchAssets };
});
