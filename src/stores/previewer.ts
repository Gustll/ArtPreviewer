import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { assetService } from '@/services/asset.service';
import type { Asset, AssetFilters, HistoryAsset, } from '@/types/asset';
import { isErrorResponse } from '@/types/api';
import { useUIStore } from './ui';
import { NotificationType } from '@/types/ui';
import type { DisplayMode } from '@/types/common';

export const usePreviewerStore = defineStore('previewer', () => {
    const ui = useUIStore();
    const filter = reactive<AssetFilters>({
        search: '',
        gameTags: {},
        format: {}
    })

    const displayMode = ref<DisplayMode>('grid')

    const assets = ref<Asset[]>([]);
    const history = ref<HistoryAsset[]>([]);

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

    async function fetchHistory() {
        loading.history = true;

        try {
            history.value = await assetService.listHistory(filter);
        } catch (e) {
            error.history = true
            if (isErrorResponse(e)) {
                ui.addNotification({ message: `${e.error.statusCode}: ${e.error.message}`, type: NotificationType.Error })
            } else {
                ui.addNotification({ message: 'An unexpected error occurred on download', type: NotificationType.Error })
            }
            console.error('Failed to fetch downloads:', e);
        } finally {
            loading.history = false;
        }
    }

    async function downloadAssets(assetIds: number[]) {
        if (assetIds.length === 0) return;

        try {
            await assetService.downloadAssets(assets.value, assetIds);
            console.log(`Downloaded ${assetIds.length} assets`);
        } catch (e) {
            // if (isErrorResponse(e)) {
            //     error.value = e;
            // } else {
            //     error.value = {
            //         message: 'Failed to download assets',
            //         statusCode: 0,
            //         details: e
            //     };
            // }
            console.error('Failed to download assets:', e);
        } finally {
            //loading.value = false;
            ui.addNotification({ message: "Download Logged Successfully", type: NotificationType.Action })
        }
    }


    const gridDisplay = computed(() => displayMode.value === 'grid');

    return { filter, assets, history, displayMode, gridDisplay, loading, fetchAssets, downloadAssets, fetchHistory };
});
