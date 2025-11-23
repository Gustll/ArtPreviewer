import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { assetService } from '@/services/asset.service';
import type {
    Asset,
    AssetFilters,
    AssetResponse,
    FormatResponse,
    GameTagResponse,
    HistoryAsset,
} from '@/types/asset';
import { isErrorResponse } from '@/types/api';
import { useUIStore } from './ui';
import { NotificationType } from '@/types/ui';
import type { DisplayMode } from '@/types/common';
import { deviceService } from '@/services/device.service';

export const usePreviewerStore = defineStore('previewer', () => {
    const ui = useUIStore();
    const filter = reactive<AssetFilters>({
        search: '',
        gameTags: {},
        format: {},
        visible: !deviceService.isMobile,
    });

    const gameTags = ref<GameTagResponse[]>([]);
    const assetFormats = ref<FormatResponse[]>([]);

    const displayMode = ref<DisplayMode>('grid');

    const assets = ref<Asset[]>([]);
    const history = ref<HistoryAsset[]>([]);

    const loading = ref(false);

    const error = reactive({
        assets: false,
        history: false,
    });

    async function fetchAssets(): Promise<void> {
        loading.value = true;

        try {
            assets.value = await assetService.listAssets(filter);
        } catch (e) {
            // Store catches and handles ApiError
            error.assets = true;
            if (isErrorResponse(e)) {
                ui.addNotification({
                    message: `${e.error.statusCode}: ${e.error.message}`,
                    type: NotificationType.Error,
                });
            } else {
                ui.addNotification({
                    message: 'An unexpected error occurred on assets',
                    type: NotificationType.Error,
                });
            }
            console.error('Failed to fetch assets:', e);
        } finally {
            loading.value = false;
        }
    }

    async function fetchAsset(assetId: number): Promise<AssetResponse | null> {
        try {
            return await assetService.getAsset(assetId);
        } catch (e) {
            // Store catches and handles ApiError
            error.assets = true;
            if (isErrorResponse(e)) {
                ui.addNotification({
                    message: `${e.error.statusCode}: ${e.error.message}`,
                    type: NotificationType.Error,
                });
            } else {
                ui.addNotification({
                    message: 'An unexpected error occurred on asset',
                    type: NotificationType.Error,
                });
            }
            console.error('Failed to fetch asset:', e);
            return null;
        }
    }

    async function fetchHistory(): Promise<void> {
        loading.value = true;

        try {
            history.value = await assetService.listHistory(filter);
        } catch (e) {
            error.history = true;
            if (isErrorResponse(e)) {
                ui.addNotification({
                    message: `${e.error.statusCode}: ${e.error.message}`,
                    type: NotificationType.Error,
                });
            } else {
                ui.addNotification({
                    message: 'An unexpected error occurred on download',
                    type: NotificationType.Error,
                });
            }
            console.error('Failed to fetch downloads:', e);
        } finally {
            loading.value = false;
        }
    }

    async function downloadAssets(assetIds: number[]): Promise<void> {
        if (assetIds.length === 0) return;

        try {
            await assetService.downloadAssets(assetIds);
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
            ui.addNotification({
                message: 'Download Logged Successfully',
                type: NotificationType.Action,
            });
        }
    }

    function resetFilter(): void {
        filter.search = '';
        filter.gameTags = {};
        filter.format = {};
    }

    const gridDisplay = computed(() => displayMode.value === 'grid');
    const showFilter = computed(() => filter.visible);

    return {
        gameTags,
        assetFormats,
        filter,
        assets,
        history,
        displayMode,
        gridDisplay,
        loading,
        showFilter,
        fetchAsset,
        fetchAssets,
        downloadAssets,
        fetchHistory,
        resetFilter,
    };
});
