<template>
    <div class="componentUpload">
        我是upload
        <el-button type="primary" v-if="statusDisabled" @click="statusDisabled = !statusDisabled">点击启用</el-button>
        <el-button type="primary" v-else @click="statusDisabled = !statusDisabled">点击禁用</el-button>
        <Editor :content="content" :statusDisabled="statusDisabled" :className="class1" @changeContent="changeContent"></Editor>
    </div>
</template>
<script>
    import Editor from '../../components/Editor.vue';
    export default {
        components: { Editor },
        data () {
            return {
                showDetail:true,
                changeList:{
                    closeIcon:false,
                },
                content:'我是默认的内容',
                statusDisabled:false,
                class1:'class1',
                class2:'class3',
            }
        },
        methods:{
            getList(){

            },
            changeContent(val){
                this.content = val;
            },
        },
        mounted() {

        },
    }
</script>
<style scoped>
    .demo-input-label {
        display: inline-block;
        width: 130px;
    }
</style>