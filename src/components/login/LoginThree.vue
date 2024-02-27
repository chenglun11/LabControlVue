<template>
    <div class='Loginbody'>
        <div class="login-header">
            <div class="img">
                <svg-icon icon-class="bgLogo"></svg-icon>
            </div>
            <div class="login-right">
                <el-form ref="form" :model="form" :rules="loginRules" class="login-form" auto-complete="on"
                         label-position="left">
                    <i class="top"></i><i class="bottom"></i>
                    <div class="logo">
                        <el-avatar :src="url"></el-avatar>
                    </div>

                    <div class="title-container">
                        <h3 class="title">{{loginTitle}}</h3>
                    </div>

                    <el-form-item prop="userName">
                        <el-input prefix-icon="el-icon-user-solid" v-model="form.userName" placeholder="用户名"
                                  name="userName" type="text" tabindex="1" auto-complete="on" />
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-lock" :key="passwordType" v-model="form.password"
                                  :type="passwordType" placeholder="密码" name="password"
                                  ref="password" @keyup.enter.native="login" show-password />

                    </el-form-item>

                    <div class="tip">
<!--                        <span @click="openResetPassword">忘记密码</span>-->
                        <el-checkbox v-model="checked">记住我</el-checkbox>
                    </div>
                  <div class="tip" style="margin-top: 10px">
                    <el-form-item prop="userType">
                    <el-radio-group v-model="form.userType">
                      <el-radio :label="1">管理员登录</el-radio>
                      <el-radio :label="2" style="margin-left: 140px">学生登录</el-radio>
<!--                      <el-radio :label="3" style="margin-left: 40px">教师登录</el-radio>-->
                    </el-radio-group>
                    </el-form-item>
                  </div>
                    <el-button  type="primary" style="width:100%;margin-bottom:30px;margin-top: 30px"
                                @click.native.prevent="login">
                        <span>登 录</span>
                    </el-button>
                    <div style="">
                        <span style="margin-right: 20px;cursor: pointer" @click="toRegister">没有账号,点击注册</span>
                    </div>
                </el-form>
            </div>
        </div>


    </div>
</template>

<script>
    // import sliderVerify from './components/sliderVerify';
    import {  Login } from '../../api/user';
    import { validateEmail } from '../../utils/validator';
    import VCode from "vue-puzzle-vcode";
    export default {
        name: 'LoginThree',
        components:{
            VCode
        },
        props:{
            loginTitle:{
                type:String,
                default:"无敌系统"
            }
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.confirmPassword !== '') {
                        this.$refs.resetForm.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            const validatePassAgain = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                // 随机字符串
                url:require('./image/favicon.png'),
                checked:false,
                form:{
                    userName:null,
                    password:null,
                },
                isShow:false,
                addOrUpdateVisible:false,
                resetRule: {
                    newPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirmPassword:[
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        { validator: validatePassAgain, trigger: 'blur', required: true }
                    ],
                    code: [{required: true, message: '验证码不得为空', trigger: "blur"}],
                    email: [{required: true, message: '邮箱不得为空', trigger: "blur"},{validator:validateEmail,trigger: 'blur'}],
                },
                isSend:false,
                passwordType: 'password',
                loginRules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
                  userType: [{required: true, message: '用户类型不得为空', trigger: "change"}],
                },
            }
        },
        created() {
            this.getCookie()
        },
        methods: {

            // /* 提交*/
            // toLogin() {
            //     let that = this;
            //     that.$refs.form.validate((flag) => {
            //         that.isShow = flag;
            //     });
            // },

            success(){
                this.login();
            },

            close(){
                this.isShow = false;
            },

            login() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        Login(this.form).then(res => {
                            if (res.code === 1) {
                                sessionStorage.setItem("userId", res.data.id);
                                sessionStorage.setItem('realName', res.data.realName);
                                sessionStorage.setItem('userType', res.data.userType);
                                sessionStorage.setItem('imageUrl',res.data.imageUrl);
                                sessionStorage.setItem('userName',res.data.userName);
                                sessionStorage.setItem('userStatus', '11');
                                this.$store.commit('saveUserInfo',res.data);
                                if (res.data.userType === 1 || res.data.userType === 3){
                                  this.$router.push('/person')
                                }else {
                                  this.$router.push('/index')
                                }

                                if (this.checked){
                                    this.setCookie(this.form.userName,this.form.password,7);
                                }else {
                                    this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
                                }
                                this.$message.success('登录成功')
                            } else {
                                this.isShow = false;
                                this.$message.error(res.msg)
                            }
                        })
                    }
                });
            },

            openResetPassword() {
                this.form = {};
                this.addOrUpdateVisible = true;
            },

            resetPassword() {
                this.$refs['resetForm'].validate(valid => {
                    if (valid) {
                        const data = { email: this.form.email, code: this.form.code, password: this.form.newPassword };
                        resetPassword(data).then(res => {
                            if (res.code === 1) {
                                this.$message.success('修改密码成功');
                                this.addOrUpdateVisible = false;
                            } else {
                                this.$message.warning(res.msg)
                            }
                        })
                    }
                });
            },

            getAuthCode() {
                if (this.form.email == null || this.form.email === '') {
                    return this.$message.warning('邮箱不得为空');
                }
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                let isEmail = emailPattern.test(this.form.email);
                if (!isEmail) {
                    return this.$message.warning('邮箱不合法')
                }
                this.$confirm('确定要发送邮件来获取验证码吗？', '提示', {
                    type: 'warning'
                }).then(action => {
                    if (action === 'confirm') {
                        sendEmail({ email: this.form.email }).then(res => {
                            if (res.code === 1) {
                                this.isSend = true;
                                this.$message.success('邮件已发送');
                                this.getData();
                            } else {
                                return this.$message.error(res.msg)
                            }

                        })
                    }
                }).catch(() => {
                });
            },

            toRegister() {
                this.$router.push('/register')
            },

            // 设置cookie
            setCookie(userName, password, days) {
                let date = new Date(); // 获取时间
                date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days); // 保存的天数
                // 字符串拼接cookie
                window.document.cookie =
                    "userName" + "=" + userName + ";path=/;expires=" + date.toGMTString();
                window.document.cookie =
                    "password" + "=" + password + ";path=/;expires=" + date.toGMTString();
            },

            // 读取cookie 将用户名和密码回显到input框中
            getCookie() {
                if (document.cookie.length > 0) {
                    let arr = document.cookie.split("; "); //分割成一个个独立的“key=value”的形式
                    for (let i = 0; i < arr.length; i++) {
                        let arr2 = arr[i].split("="); // 再次切割，arr2[0]为key值，arr2[1]为对应的value
                        if (arr2[0] === "userName") {
                            this.form.userName = arr2[1];
                        } else if (arr2[0] === "password") {
                            this.form.password = arr2[1];// base64解密
                            this.checked = true;
                        }
                    }
                }
            },
        },
    }
</script>

<style scoped lang='scss'>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    @media screen and (max-width: 1118px) {
        .Loginbody {
            height: 100%;
            width: 100%;
            background-image: url("./image/login-three-bg.png");



            .login-header {

                .img {
                    display: none;
                }

                .login-right {
                    width: 100%;
                    padding: 20px;

                    .login-form {
                        width: 500px;
                        height: 450px;
                        max-width: 100%;
                        padding: 35px 35px 15px 35px;
                        border-radius: 5px;
                        margin: auto;
                        position: relative;
                        overflow: hidden;
                        border: 1px solid #74efff;

                        &::before {
                            content: ' ';
                            position: absolute;
                            width: 4px;
                            height: 100%;
                            top: -100%;
                            left: 0;
                            background-image: linear-gradient(0deg,
                                    transparent,
                                    #ff74ba,
                                    transparent);
                            animation: two 4s linear infinite;
                        }

                        &::after {
                            content: ' ';
                            position: absolute;
                            width: 4px;
                            height: 100%;
                            bottom: -100%;
                            right: 0;
                            background-image: linear-gradient(360deg,
                                    transparent,
                                    #74efff,
                                    transparent);
                            animation: four 4s linear 2s infinite;
                        }

                        i {
                            position: absolute;
                            display: inline-block;
                            height: 4px;
                            width: 100%;
                        }

                        .logo {
                            text-align: center;
                        }

                        .bottom {
                            bottom: 0;
                            left: -100%;
                            background-image: linear-gradient(270deg,
                                    transparent,
                                    #b574ff,
                                    transparent);
                            animation: one 4s linear 1s infinite;
                        }

                        .top {
                            top: 0;
                            right: -100%;
                            background-image: linear-gradient(270deg,
                                    transparent,
                                    #74ff97,
                                    transparent);
                            animation: three 4s linear 3s infinite;
                        }
                    }

                    .title {
                        font-size: 26px;
                        font-weight: 400;
                        color: #303133;
                        margin: 0px auto 40px auto;
                        text-align: center;
                        font-weight: bold;
                        font-weight: 400;
                    }

                    .show-pwd {
                        position: absolute;
                        right: 10px;
                        top: 7px;
                        font-size: 16px;
                        color: $dark_gray;
                        cursor: pointer;
                        user-select: none;

                        svg {
                            vertical-align: 5px;
                        }
                    }
                }
            }

            .el-login-footer {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                text-align: center;
            }
        }
    }


    @media screen and (min-width: 1119px) {
        .Loginbody {
            //height: 100%;
            width: 100%;
          height: 100vh;
            background-image: url("./image/login-three-bg.png");



            .login-header {
                display: flex;
                height: 100%;

                .img {
                    height: 50px;
                    position: relative;
                    top: 40%;
                    left: 20%;

                    .svg-icon {
                        width: 500px;
                        height: 300px;
                    }
                }

                .login-right {
                    width: 100%;
                    display: flex;
                    padding: 20px;
                    margin-left: 300px;

                    .login-form {
                        width: 500px;
                        height: 450px;
                        max-width: 100%;
                        padding: 35px 35px 15px 35px;
                        border-radius: 5px;
                        margin: auto;
                        position: relative;
                        overflow: hidden;
                        border: 1px solid #74efff;

                        &::before {
                            content: ' ';
                            position: absolute;
                            width: 4px;
                            height: 100%;
                            top: -100%;
                            left: 0;
                            background-image: linear-gradient(0deg,
                                    transparent,
                                    #ff74ba,
                                    transparent);
                            animation: two 4s linear infinite;
                        }

                        &::after {
                            content: ' ';
                            position: absolute;
                            width: 4px;
                            height: 100%;
                            bottom: -100%;
                            right: 0;
                            background-image: linear-gradient(360deg,
                                    transparent,
                                    #74efff,
                                    transparent);
                            animation: four 4s linear 2s infinite;
                        }

                        i {
                            position: absolute;
                            display: inline-block;
                            height: 4px;
                            width: 100%;
                        }

                        .logo {
                            text-align: center;
                        }

                        .bottom {
                            bottom: 0;
                            left: -100%;
                            background-image: linear-gradient(270deg,
                                    transparent,
                                    #b574ff,
                                    transparent);
                            animation: one 4s linear 1s infinite;
                        }

                        .top {
                            top: 0;
                            right: -100%;
                            background-image: linear-gradient(270deg,
                                    transparent,
                                    #74ff97,
                                    transparent);
                            animation: three 4s linear 3s infinite;
                        }
                    }

                    .title {
                        font-size: 26px;
                        font-weight: 400;
                        color: #303133;
                        margin: 0px auto 40px auto;
                        text-align: center;
                        font-weight: bold;
                        font-weight: 400;
                    }

                    .show-pwd {
                        position: absolute;
                        right: 10px;
                        top: 7px;
                        font-size: 16px;
                        color: $dark_gray;
                        cursor: pointer;
                        user-select: none;

                        svg {
                            vertical-align: 5px;
                        }
                    }
                }
            }

            .el-login-footer {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                text-align: center;
            }
        }
    }

    @keyframes one {
        0% {
            left: -100%;
        }

        50%,
        100% {
            left: 100%;
        }
    }

    @keyframes two {
        0% {
            top: -100%;
        }

        50%,
        100% {
            top: 100%;
        }
    }

    @keyframes three {
        0% {
            right: -100%;
        }

        50%,
        100% {
            right: 100%;
        }
    }

    @keyframes four {
        0% {
            bottom: -100%;
        }

        50%,
        100% {
            bottom: 100%;

        }
    }

    .tip{
        width: 100%;
        height: 20px;
        /*background-color: red;*/
        display: flex;
        /*color: white;*/
        font-size: 13px;
        cursor: pointer;
        justify-content: space-between;
    }
</style>
