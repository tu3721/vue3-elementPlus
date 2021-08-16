<template>
        <template  v-for="(value,index) in data" :key="index">
            <el-submenu :index="value.path" v-if="value.children">
                <template #title>
                    <i v-if="value.icon" :class="value.icon"></i>
                    <span>{{value.name}}</span>
                </template>
                <MenuTree :data="value.children"></MenuTree>
            </el-submenu>
            <el-menu-item  :index="value.path" v-else>
                <i v-if="value.icon" :class="value.icon"></i>
                <template #title>{{value.name}}</template>
            </el-menu-item>
        </template>
</template>
<script>
    import MenuTree from "@/components/MenuTree";
    export default {
        name:'MenuTree',
        props:["data"],
        components:{
            MenuTree:MenuTree
        },
        data () {
            return {
            }
        },
        created() {
        },
        methods: {
            getImgUrl(icon) {
                return icon;
            }
        }
    }
</script>
<style>

</style>