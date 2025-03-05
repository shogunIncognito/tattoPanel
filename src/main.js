import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Vue3Toastify, {
        autoClose: 3000,
        position: 'top-right',
        theme: 'dark',
        clearOnUrlChange: false
    })
    .mount('#app')
