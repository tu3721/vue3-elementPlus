<template>
    <el-row class="loginDiv" style="height: calc(100vh);width: calc(100vw);background-color: rgb(249,249,249)">
        <transition name="el-zoom-in-center">
            <div class="transition-box">
                <div class="login" style="color: #FFFFFF;text-align: center;height: 450px;position: fixed;top: calc(15vh);background-color: rgba(1, 84, 120, 1);width: calc(100vw)">
                    <div style="width: 300px;color: #FFFFFF;margin: 0 auto">
                        <img src="@/assets/logo.png" style="width: 153px;margin: 25px 0 0px">
                        <div style="font-size: 36px;font-weight: 700;margin: 15px 0">XXX后台管理系统</div>
                        <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                            <el-form-item prop="username">
                                <el-input prefix-icon="el-icon-user-solid" placeholder="请输入用户名称" v-model="ruleForm.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input prefix-icon="el-icon-lock" placeholder="请输入登录密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="width: 100%" @click="submitForm('ruleForm')">登录</el-button>
                            </el-form-item>
                        </el-form>
                        <el-row style="font-size: 12px">
                            <el-col :span="12" style="text-align: left"><el-checkbox v-model="checked"></el-checkbox><span style="padding-left: 8px">记住密码</span></el-col>
                            <el-col :span="12" style="text-align: right;cursor: pointer" ><a style="text-decoration: none;color: #FFFFFF" href="#/forget">忘记密码</a></el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </transition>
    </el-row>
</template>
<script>
    export default {
        name:'Login',
        components:{
        },
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录密码'));
                } else {
                    if (this.ruleForm.password !== '') {
                        this.$refs.ruleForm.validateField('password');
                    }
                    callback();
                }
            };
            return {
                checked:false,
                ruleForm: {
                    username:'',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                },
            };
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('通过验证')
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
    .login input{
        background:rgba(255,255,255,0.2)!important;
        color: #FFFFFF!important;
    }
    .login .el-input__icon{
        font-size: 18px;
        color: #FFFFFF;
        vertical-align: -2px!important;
    }
</style>