<template>
    <div class="register-container">
        <RegisterThree></RegisterThree>
    </div>
</template>

<script>
    import RegisterThree from '../login/RegisterThree';

    export default {
        name: 'Register',
        components:{
            RegisterThree
        }
    }
</script>


<style scoped>
    .register-container{
        height: 100%;
    }
</style>
