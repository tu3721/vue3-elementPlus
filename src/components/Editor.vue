<template>
  <div class="editor">
      <div class='clearfix'>
      <!-- 富文本编辑框 -->
      <div :id="className"
           style="height:100%;background: #ffffff;"></div>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'Editor',
    props: {
        content: String,
        statusDisabled:Boolean,
        className:String
    },
    data () {
        return {
            phoneEditor: '',
            first:false,
        }
    },
    methods: {
        changeContent(){
            this.$emit('changeContent', this.phoneEditor.txt.html());
        }
    },
    watch:{
        content(val){
            if (val != this.phoneEditor.txt.html()){
                this.phoneEditor.txt.html(val);
            }
        },
        statusDisabled(val){
            if (val){
                this.phoneEditor.disable();
            }else{
                this.phoneEditor.enable();
            }
        }
    },
    mounted () {
        // wangeditor
        let _this = this;
        console.log('#'+this.className);
        this.phoneEditor = new E('#'+this.className);
        // 上传图片到服务器，base64形式
        // this.phoneEditor.customConfig.uploadImgShowBase64 = true
        // 隐藏网络图片
        // this.phoneEditor.customConfig.showLinkImg = false
        // 创建一个富文本编辑器
        this.phoneEditor.create()
        this.phoneEditor.txt.html(_this.content);
        document.getElementById(_this.className).addEventListener("DOMSubtreeModified", function(){
            // 富文本内容(首次加载时不传参变化，防止父页面form启动验证)
            if (_this.first){
                _this.changeContent();
            }else{
                _this.first = true;
            }
        }, false)

    }
}
</script>

<style scoped>
    #websiteEditorElem{
        text-align: left;
    }
    .w-e-text{
        min-height: 100%;
    }
</style>
