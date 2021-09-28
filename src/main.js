import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from  "vue-router"

createApp(App).use(VueAxios, axios, VueRouter).mount('#app')

