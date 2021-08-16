<template>
    <el-row class="forget" style="height: calc(100vh);width: calc(100vw);background-color: rgb(249,249,249)">
        <div @click="this.$router.push('/login')" style="cursor: pointer;width:100%;color: #606266;font-size: 14px;padding-top: 16px;padding-left: 25px">&lt;{{title}}</div>
        <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <div v-if="show == 1" class="transition-box">
                <transition name="el-zoom-in-top">
                    <div style="text-align: center;height: 450px;position: fixed;top: calc(15vh);width: calc(100vw)">
                        <div style="width: 333px;margin: 0 auto;border: 1px solid #DCDFE6;padding: 50px;background-color: #FFFFFF">
                            <div style="font-size: 24px;font-weight: 400;margin: 15px 0 25px">忘记密码</div>
                            <el-form-item prop="mobile">
                                <el-input prefix-icon="el-icon-mobile-phone" type="number" placeholder="手机" v-model="ruleForm.mobile" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="graphic">
                                <el-input prefix-icon="el-icon-s-check" style="width: 200px" placeholder="图形验证码" v-model="ruleForm.graphic" autocomplete="off"></el-input>
                                <span @click="refreshCode" style="cursor: pointer;display: inline-block;width: 133px;vertical-align: middle">
                                    <SIdentify :identifyCode="identifyCode"></SIdentify>
                                </span>
                            </el-form-item>
                            <el-form-item prop="yzm">
                                <el-input prefix-icon="el-icon-s-check" maxlength="4" style="width: 200px" type="number" placeholder="验证码" v-model="ruleForm.yzm" autocomplete="off"></el-input>
                                <el-button style="width: 123px;margin-left: 10px" v-if="showYzm" @click="getCode()">获取验证码</el-button>
                                <el-button style="width: 123px;margin-left: 10px" disabled v-if="!showYzm">{{ times }}s</el-button>
                            </el-form-item>
                            <el-form-item style="margin-top: 50px">
                                <el-button type="primary" style="width: 100%" @click="submitForm('ruleForm',1)">找回密码</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </transition>
            </div>
            <div v-if="show == 2" class="transition-box">
                <transition name="el-zoom-in-top">
                    <div style="text-align: center;height: 450px;position: fixed;top: calc(15vh);width: calc(100vw)">

                        <div style="width: 333px;margin: 0 auto;border: 1px solid #DCDFE6;padding: 50px;background-color: #FFFFFF">
                            <div style="font-size: 24px;font-weight: 400;margin: 15px 0 25px">设置新密码</div>
                            <el-form-item prop="password">
                                <el-input prefix-icon="el-icon-lock"  placeholder="请输入新密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="repassword">
                                <el-input prefix-icon="el-icon-lock"  placeholder="请输入确认密码" type="password" v-model="ruleForm.repassword" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top: 50px">
                                <el-button type="primary" style="width: 100%" @click="submitForm('ruleForm',2)">确认</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </transition>

            </div>
        </el-form>

    </el-row>
</template>
<script>
    // import SIdentify from "../../components/SIdentify";
    // import { getYzm,validateYzm,changePassWord } from "../../common/js/login";

    export default {
        name:'Forget',
        components:{
            // SIdentify:SIdentify
        },
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.password !== '') {
                        this.$refs.ruleForm.validateField('repassword');
                    }
                    callback();
                }
            };
            var validateMobile = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    let reg = /^1[0-9]{10}$/
                    if (!reg.test(this.ruleForm.mobile)) {
                        callback(new Error('请输入正确的手机号'));
                    }
                    callback();
                }
            };
            var validateGraphic = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入图形验证码'));
                } else {
                    if (this.ruleForm.graphic.toLowerCase() != this.identifyCode.toLowerCase()) {
                        callback(new Error('请输入正确的图形验证码'));
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    console.log(value);
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                title:'去登录',
                showYzm:true,
                times:60,
                identifyCode:'',
                show:1,
                checked:false,
                ruleForm: {
                    mobile:'',
                    graphic:'',
                    yzm:'',
                    password: '',
                    repassword: '',
                },
                rules: {
                    mobile: [
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    graphic: [
                        { validator: validateGraphic, trigger: 'blur' }
                    ],
                    yzm:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    repassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
            };
        },
        created() {
            let mobile = window.sessionStorage.getItem('mobile');
            if (mobile){
                this.ruleForm.mobile = mobile;
                this.show = 2;
                this.title = '返回';
            }
            this.refreshCode();//获取验证码
        },
        methods:{
            getCode(){
                this.$refs['ruleForm'].validateField('mobile', valid => {
                    if (!valid) {
                        // 表单验证通过
                        // getYzm({mobile:this.ruleForm.mobile}).then(res => {
                        //     this.showYzm = false;
                        //     this.timer = setInterval(()=>{
                        //         this.times--;
                        //         if(this.times===0){
                        //             this.show = true;
                        //             clearInterval(this.timer)
                        //         }
                        //     },1000)
                        // })
                    }
                })
            },
            randomNum () {
                var str="123456789qwertyuiplkjhgfdsazxcvbnmQWERTYUIPLKJHGFDSAZXCVBNM";
                var max = str.length - 1;
                //给一个空字符串
                var res='';
                //循环4次，得到4个字符
                for(var i=0;i<4;i++){
                    //将得到的结果给字符串，调用随机函数，0最小数，62表示数字加字母的总数
                    var num = Math.round(Math.random()*(max-0)+0);
                    res+=str[num];
                }
                return res;
            },
            refreshCode () {
                this.identifyCode = this.randomNum(1000,9999);
            },
            submitForm(formName,type) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (type == 1){
                            // validateYzm({mobile:this.ruleForm.mobile,code:this.ruleForm.yzm}).then(res => {
                            //     window.sessionStorage.setItem('phone',this.ruleForm.mobile);
                            //     this.show  = 2;
                            // })
                        }else{
                            // changePassWord(this.ruleForm).then(res => {
                            //     window.sessionStorage.clear();
                            //     this.$router.push('/login');
                            // })
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    .forget input{
        /*background:rgba(255,255,255,0.2)!important;*/
        /*color: #FFFFFF!important;*/
        -moz-appearance:textfield;
    }
    .forget .el-input__icon{
        font-size: 18px;
        /*color: #FFFFFF;*/
        vertical-align: -2px!important;
    }
    .forget
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
</style>