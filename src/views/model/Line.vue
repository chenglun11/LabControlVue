<template>
  <div class="line">
    <div class="title">
      {{title}}
    </div>
    <div class="subTitle">
      {{subTitle}}
    </div>
  </div>
</template>

<script>
export default {
  name:"Line",
  props: {
    title: {
      type: String,
      default: '产品中心'
    },
    subTitle: {
      type: String,
      default: 'Products Center'
    }
  }
}
</script>


<style scoped lang="scss">
.line{
  width: 100%;
  height: 100px;
  text-align: center;
  .title{
    font-size: 22px;
    line-height: 50.4px;
    color: rgb(67, 67, 67);
  }
  .subTitle{
    font-size: 18px;
    line-height: 30.4px;
    color: rgb(148, 148, 148);
  }
}
</style>
