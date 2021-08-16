//路由
import { createRouter,createWebHashHistory } from "vue-router";

import Dashboard from '../views/dashboard'
import Container from '../components/Container'
import Component from '../views/component/index.vue'
import ComponentUpload from '../views/component/upload.vue'
import Login from '../views/login/login.vue'
import Forget from '../views/login/forget.vue'
import Index from '../views/index/index.vue'
const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Index',
        component: Container,
        children: [
            {
                path: '/dashboard',
                name: '首页',
                component: Dashboard,
                icon:'el-icon-s-home',
            },
            {
                path: '/component',
                name: '构件',
                component: Index,
                icon:'el-icon-s-opportunity',
                children:[
                    {
                        path: '/component',
                        name: '构件管理',
                        component: Component,
                    },
                    {
                        path: '/componentUpload',
                        name: '构件上传',
                        component: ComponentUpload,
                    },
                ]
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forget',
        name: 'Forget',
        component: Forget,
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router