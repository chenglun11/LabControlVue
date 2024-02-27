<template>
  <div class="item" @click="toDetail(place)">
    <el-image :src="place.imageUrl" class="image"></el-image>
    <div class="title">
      <div class="name">
        {{place.title}}
      </div>
      <div class="introduction" :title="place.summary">
        {{place.summary}}
      </div>
      <div class="time">
        <div class="left">
          {{place.createTime}}
        </div>
        <div class="right">
          详情>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ServeModel',
  props:{
    place:{},
  },
  methods:{
    toDetail(row){
      this.$router.push({
        path:'/archives-detail',
        query:{id:row.id}
      })

    }
  }
};
</script>


<style scoped>
.item{
  width: 5.625rem;
  background: white;
  //background: red;
  height: 6.5625rem;
  border: solid 1px #f2f2f2;
  display: inline-flex;
  flex-direction:column;
  cursor: pointer;
  margin-left: 0.3125rem;
  margin-top: 0.078125rem;
  padding: 0.15625rem;
  .image{
    flex: 3;
  //background: green;
  }
  .title{
    flex: 1;
  //background: #3e9eff;


    .name{
      font-family: Microsoft YaHei,serif;
      font-size: 0.21875rem;
      font-weight: bold!important;
      //display: block;
      //text-align: center;
      line-height: 0.46875rem
    }
    .introduction{
      font-family: Microsoft YaHei,serif;
      font-size: 0.1875rem;
      line-height: 0.3125rem;
      margin-top: 0.05rem;
      color: #696969;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      height:0.703125rem;
      //background: red;
    }
    .time{
      width: 100%;
      height: 0.78125rem;
      //background: green;
      display: inline-flex;
      flex-direction: row;
      line-height: 0.78125rem;
      justify-content: space-between;
      .left{
        color: #525252;
        font-size: 0.15625rem;
        font-family: Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",sans-serif;
      }
      .right{
        font-size: 0.15625rem;
        color: #33724e;
        font-weight: 700;
      }
    }
  }
}
</style>
