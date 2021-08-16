// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import router from './router';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import 'element-plus/lib/theme-chalk/base.css';
import $http from './utils/http';

// router.beforeEach((to,from,next)=>{
//     let isLogin = window.sessionStorage.getItem('Token');  // 是否登录
//     if (isLogin){
//         if (to.path === '/login') {
//             next({name:'Index'})
//         }
//     }else{
//         if (to.path !== '/login' && to.path !== '/forget'){
//             next({name:'Login'});
//         }
//     }
//     next();
// })


const app = createApp(App)

app.config.globalProperties.$http=$http;
app.use(ElementPlus )
app.use(router)
app.mount('#app')

