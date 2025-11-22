import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/styles/main.scss';
import '@/styles/pallete.scss';
import '@/styles/tachyons.scss';

import App from './App.vue';
import router from './router';
import { deviceService } from './services/device.service';

deviceService.init();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
