import { createApp } from 'vue'
import router from "./router"
import { createPinia } from "pinia"
import { createHead } from "@vueuse/head"
import {Chains, createWeb3Auth} from '@kolirt/vue-web3-auth'
import App from './App.vue'

import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(createHead())
app.use(createWeb3Auth({
    projectId: import.meta.env.VITE_PROJECT_ID,
    chains: [
        Chains.fantom,
    ],
}))
app.use(router)

app.mount('#app')
