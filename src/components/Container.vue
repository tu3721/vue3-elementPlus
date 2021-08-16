<template>
    <div class="app" style="width: 100%;height: 100%">
        <el-container style="height: calc(100vh)">
            <el-aside style="background-color: black">
                <div class="app-side-logo" style="text-align: center;">
                    <img v-if="isCollapse" style="width: 45px;height: 45px;border-radius: 50%;margin-top: 28px" src="@/assets/headPort.jpg"/>
                    <span v-else style="font-size: 20px;font-weight: 600">XXX后台管理系统</span>
                </div>
                <el-menu class="el-menu-vertical-demo"
                         :collapse="isCollapse"
                         :router="true"
                         background-color="black"
                         text-color="#ffffff"
                         active-text-color="#409EFF"
                         :default-active="activeIndex"
                         :unique-opened="true">
                    <!-- 侧边导航组件 -->
                    <MenuTree :data="routes"></MenuTree>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-row>
                        <el-col :span="12" @click="isCollapse = !isCollapse" style="text-align: left;color: #FFFFFF;line-height: 60px;font-size: 22px">
                            <i v-if="isCollapse" class="el-icon-s-unfold"></i>
                            <i v-else class="el-icon-s-fold"></i>
                        </el-col>
                        <el-col :span="12" style="text-align: right;color: #FFFFFF;font-size: 14px;">
                           <span style="display: inline-block;padding: 0 15px">
                               <span>
                                   <img style="width: 30px;height: 30px;border-radius: 50%;vertical-align: -10px;margin-right: 8px" src="@/assets/headPort.jpg"/>
                               </span>
                               <span>中寓员工</span>
                           </span>
                            <span style="display: inline-block;padding: 0 15px">修改密码</span>
                            <span style="display: inline-block;padding: 0 15px">网站首页</span>
                            <span style="display: inline-block;padding: 0 15px"><i class="el-icon-message-solid"></i>99+</span>
                            <span style="display: inline-block;padding: 0 15px">退出</span>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main style="padding: 0">

                    <div class="app-wrap">
                        <!-- 此处放置el-tabs代码 -->
                        <div  class="mainTab">

                            <!--                            <el-tabs v-model="activeIndex" type="card" editable>-->
                            <!--                                <el-tab-pane-->
                            <!--                                        :icon="item.icon"-->
                            <!--                                        :key="item.name"-->
                            <!--                                        :label="item.name"-->
                            <!--                                        @tab-click='tabClick'-->
                            <!--                                        @tab-remove='tabRemove'-->
                            <!--                                        v-for="(item) in openTab">-->
                            <!--                                    <template #label>-->
                            <!--                                        <span><i :class="item.icon"></i>{{item.name}}</span>-->
                            <!--                                    </template>-->
                            <!--                                </el-tab-pane>-->
                            <!--                            </el-tabs>-->
                            <el-tabs
                                    v-model="activeIndex"
                                    type="card"
                                    closable
                                    v-if="openTab.length"
                                    @tab-click='tabClick'
                                    @tab-remove='tabRemove'>
                                <el-tab-pane
                                        :key="item.name"
                                        v-for="(item) in openTab"
                                        :label="item.name"
                                        :name="item.path">
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="content-wrap" style=";padding: 0 25px;background-color: rgb(249,249,249);min-height: calc(100vh - 130px)">
                            <router-view v-slot="{ Component }">
                                <keep-alive>
                                    <component :is="Component" />
                                </keep-alive>
                            </router-view>
                        </div>
                    </div>
                </el-main>
                <el-footer>@版权所有</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import MenuTree from "@/components/MenuTree";
    export default {
        name: 'Container',
        components:{
            MenuTree:MenuTree,
        },
        data () {
            return {
                openTab:[],//所有打开的路由
                activeIndex:'', //激活状态
                MainColor:'#FFFFFF',
                username: 'Admin',
                isCollapse: false,
            }
        },
        watch:{
            $route(to){
                for(let item of this.openTab){
                    if(item.name === to.name){
                        this.set_active_index(to.path);
                        return;
                    }
                }
                let  data = {path: to.path, name: to.name};

                // for (let kk of this.routes){
                //     if (kk.name === to.name){
                //     }
                //     if (kk.children){
                //         for(let kkk of kk.children){
                //             if (kkk.name === to.name){
                //                 data = {path: to.path, name: to.name};
                //             }
                //         }
                //     }
                // }
                this.set_active_index(to.path);
                this.add_tabs(data);
            },
        },
        computed: {
            // 获取route路由
            routes () {
                return this.$router.options.routes[0].children
            }

        },
        created() {
            this.activeIndex = this.$route.path;
            this.openTab.push({path: '/dashboard', name: '首页',icon:'el-icon-s-home'});
            if (this.$route.path !== '/dashboard'){
                this.openTab.push({path: this.$route.path, name: this.$route.name});

                // let rout = this.$router.options.routes[0].children;
                // for(let item of rout){
                //     if (item.name === this.$route.name){
                //     }
                // }
            }
        },
        methods: {
            tabClick(){
                this.$router.push({path: this.activeIndex});
            },
            //移除tab标签
            tabRemove(targetName){
                //首页不删
                if(targetName == '/' || targetName == '/dashboard'){
                    return
                }
                this.delete_tabs(targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.openTab && this.openTab.length >= 1) {
                        this.set_active_index(this.openTab[this.openTab.length-1].path);
                        this.$router.push({path: this.activeIndex});
                    }
                }
            },
            add_tabs (data) {
                this.openTab.push(data);
            },
            // 删除tabs
            delete_tabs (route) {
                let index = 0;
                for (let option of this.openTab) {
                    if (option.path === route) {
                        break;
                    }
                    index++;
                }
                this.openTab.splice(index, 1);
            },
            // 设置当前激活的tab
            set_active_index (index) {
                this.activeIndex = index;
            },
            toggleSideBar () {
                this.isCollapse = !this.isCollapse
            },
            logout () {
                this.$confirm('确认退出?', '提示', {})
                    .then(() => {
                        sessionStorage.removeItem('user');
                        this.$router.push('/login');
                    })
                    .catch(() => { });
            },
            handleOpen (key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect (key, keyPath) {
                console.log(key, keyPath);
            },
        },
        mounted () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
            }
        },
    }
</script>

<style>
    .el-header{
        text-align: right;
        line-height: 60px;
        border-bottom: 1px solid #DCDFE6;
        background-color: #000000;
        height: 60px!important;
    }

    .el-footer {
        border-top: 1px solid #DCDFE6;
        line-height: 25px;
        font-size: 12px;
        height: 25px!important;
        background-color: #FFFFFF;
        color: #909693;
    }

    .mainTab .el-tabs__nav-scroll{
        background-color: rgb(239,238,240);
    }
    .mainTab .el-tabs--card>.el-tabs__header .el-tabs__nav{
        border-top: 0;
    }
    .mainTab .el-tabs--card>.el-tabs__header{
        margin-bottom: 0;
    }
    .el-aside {
        width: var(--el-menu-background-color) !important;
        line-height: 85px;
        /*border-right: solid 1px var(--el-menu-border-color);*/
        background-color: black;
        color: #FFFFFF;
    }

    .mainTab .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable{
        padding-right: 18px!important;
        padding-left: 18px!important;
    }
    .mainTab .el-tabs__nav .el-tabs__item:first-child .el-icon-close:first-child{
        display: none;
    }
    .mainTab .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border-bottom: 0px;
        background-color: #FFFFFF;
    }
    .el-aside .el-menu{
        border-right: 0px;
        background-color: black;
    }

    body > .el-container {
        margin-bottom: 40px;
    }


    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .el-dropdown-link {
        cursor: pointer;
        line-height: 60px;
    }
    .hhhh .el-icon-arrow-down {
        font-size: 12px;
        line-height: 15px;
    }

    .el-menu-item:hover{
        background-color: #33A2EF !important;
        color: #FFFFFF !important;
    }

    .el-menu-item i:hover{
        background-color: #33A2EF !important;
        color: #FFFFFF !important;
    }

    .el-submenu__title:hover{
        background-color: #33A2EF !important;
        color: #FFFFFF !important;
    }

    .app-wrap .el-affix--fixed{
        z-index:10005!important;
    }

</style>