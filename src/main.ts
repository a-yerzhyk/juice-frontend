import './assets/main.scss'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import PrimeVueConfig from './plugins/primevue';

const app = createApp(App)

app.use(PrimeVue, PrimeVueConfig);
app.use(router)

app.mount('#app')
