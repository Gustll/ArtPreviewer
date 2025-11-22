// Service used to determin if the device is mobile
import { ref } from 'vue';

const isMobile = ref(window.matchMedia('(max-width: 760px)').matches);

class DeviceService {
    private mediaQuery: MediaQueryList;
    private initialized = false;

    constructor() {
        this.mediaQuery = window.matchMedia('(max-width: 760px)');
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;

        // Listen for screen width changes
        this.mediaQuery.addEventListener('change', (e) => {
            isMobile.value = e.matches;
        });
    }

    get isMobile() {
        return isMobile.value;
    }
}

export const deviceService = new DeviceService();
