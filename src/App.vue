<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>
<script>
    import { ElConfigProvider } from 'element-plus'
    import zhCn from 'element-plus/lib/locale/lang/zh-cn'
    export default{
        components: {
            [ElConfigProvider.name]: ElConfigProvider,
        },
        data() {
            return {
                locale: zhCn,
            }
        },
    }
</script>
<style>

    body{
        margin: 0;
        min-width: 1200px;
        background-color: #F1F1F1;
        font-family: '萍方';
    }
    *::-webkit-scrollbar { width:0px; }
    *::-webkit-scrollbar-track { background:#f2f2f2; }
    *::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.2); }
    *::-webkit-scrollbar-thumb:hover { background:#f2f2f2 }
    *::-webkit-scrollbar-thumb:active { background:rgba(0,0,0,0.2); }

    .el-message{
        z-index: 10006!important;
    }
    .el-select__popper .el-popper .is-light .is-pure{
        z-index: 10006!important;
    }

</style>
