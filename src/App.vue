<template >
    <div id="app">
        <transition name="fade">
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>

 export default {
   created(){
   }
 }
</script>
<style scoped>

    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
