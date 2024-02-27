<template>
    <div class="login-container">
        <LoginThree login-title="实验室预约管理系统"></LoginThree>
    </div>
</template>

<script>
    import LoginThree from '../login/LoginThree';

    export default {
        name: 'Login',
        components:{
            LoginThree,
        }
    }
</script>


<style scoped>
    .login-container{
        height: 100%;
    }
</style>
