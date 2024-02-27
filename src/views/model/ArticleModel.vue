<template>
  <div class="article-model">
    <div class="tip"></div>
    <span class="el-icon-tickets"></span>
    <div class="top">
      <div class="top-left">
        <div class="title">
          <span class="title-top" v-if="indexNumber < 3">热门</span>
          <span class="title-top" v-else>正常</span>
          <h3 class="title-right" @click="toDetail(model.id)">{{model.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span v-if="model.type === 1">文字</span>
            <span v-if="model.type === 2">语音</span>
            <span v-if="model.type === 3">图形</span>
            <span v-if="model.type === 4">视频</span>
          </h3>
        </div>
        <div class="summary">
          {{model.summary}}
        </div>
      </div>
      <div class="top-right">
        <el-image class="image" :src="model.imageUrl" />
      </div>
    </div>
    <div class="bottom">
      <div class="author">
        <el-image class="image" :src="model.userImageUrl"></el-image>
        <div class="name">{{model.realName}}</div>
      </div>
      <div class="sort">
        <el-tag type="success">{{model.sortName}}</el-tag>
      </div>
      <div class="operate">
        <span class="item">
          <i class="el-icon-view"></i>
          <span class="name">阅读</span>
          <span class="name">{{model.readCount}}</span>
        </span>
        <span class="item">
          <i class="el-icon-chat-dot-round"></i>
          <span class="name">评论</span>
          <span class="name">{{model.commentCount}}</span>
        </span>
        <span class="item">
          <i class="iconfont icon-dianzan" @click="addLike(model)"></i>
          <span class="name">赞</span>
          <span class="name">{{model.likeCount}}</span>
        </span>
        <span class="item">
          <i @click="saveCollect(model)" style="font-size: 14px" class="el-icon-star-off" v-if="!model.isCollect"></i>
          <i @click="saveCollect(model)" style="font-size: 14px" class="el-icon-star-on" v-else></i>
           <span class="name">收藏</span>
          <span class="name">{{model.collectCount}}</span>
        </span>
        <span class="item">
          <i class="el-icon-time"></i>
          <span class="name">{{model.createTime}}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { saveLikeInfo } from '@/api/like';
import { updateArchivesReadCount } from '@/api/archives';
import { saveCollectInfo } from '@/api/collect';

export default {
  name: 'ArticleModel',
  props:{
    model:{},
    indexNumber:{
      type:Number
    }
  },
  methods:{
    toDetail(id){
      this.$router.push({
        path:'/archives-detail',
        query:{id:id}
      });
      updateArchivesReadCount({id:id}).then(res =>{

      })
    },
    addLike(model){
      if (sessionStorage.getItem('userId') == null){
        return this.$message.warning('请登录')
      }
      const like = {
        userId:sessionStorage.getItem('userId'),
        archivesId:model.id
      }
      saveLikeInfo(like).then(res =>{
        this.$message.success(res.msg);
        this.$emit('reloadModel','success')
      })
    },
    saveCollect(model){
      if (sessionStorage.getItem('userId') == null){
        return this.$message.warning('请登录')
      }
      const collect = {
        userId:sessionStorage.getItem('userId'),
        archivesId:model.id
      }
      saveCollectInfo(collect).then(res =>{
        this.$message.success(res.msg);
        this.$emit('reloadModel','success')
      })
    }
  }
};
</script>


<style scoped lang="scss">
.article-model{
  width: 100%;
  height: 215px;
  cursor: pointer;
  //background: red;
  //padding: 10px 5px 10px 15px;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-top: 10px;
  display: inline-flex;
  flex-direction: column;
  position: relative;

  .tip{
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-color: transparent #40c9c6;
    border-width: 0 40px 40px 0;
    border-style: solid;
    z-index: 100;
  }

  .el-icon-tickets{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 16px;
    color: #7fffd4;
    z-index: 101;
  }

  .top{
    flex: 3;
    //background: red;
    height: 180px;
    display: flex;
    .top-left{
      flex: 4;
      //background: #00a854;
      .title{
        display: inline-flex;
        //background: red;
        height: 40px;
        width: 100%;
        .title-top{
          background-image: -webkit-linear-gradient(0deg,#3ca5f6,#a86af9);
          display: inline-block;
          border-top-right-radius: 5px;
          border-bottom-left-radius: 5px;
          font-size: 15px;
          margin-left: 10px;
          margin-top: 5px;
          color: #fff;
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
        .title-right{
          //width: 60px;
          height: 30px;
          line-height: 30px;
          margin-top: 5px;
          margin-left: 10px;
        }
      }
      .summary{
        width: 100%;
        //background: #5a5a5a;
        height:110px;
        //height: 150px;
        padding: 10px 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        font-size: 15px;
        line-height: 25px;
      }
    }
    .top-right{
      flex: 1;
      //background: #333333;
      padding: 10px;
      .image{
        width: 300px;
        height: 140px;
      }
    }
  }
  .bottom{
    flex: 1;
    //background: gold;
    //height: 20px;
    display: inline-flex;
    .author{
      width: 100px;
      //background: red;
      height: 100%;
      display: inline-flex;
      .image{
        border: 1px solid #e4e7ed;
        transition: transform .5s;
        width: 38px;
        height: 38px;
        object-fit: cover;
        margin-top: 6px;
        margin-left: 10px;
        border-radius: 50%;
      }
      .name{
        line-height: 50px;
        margin-left: 5px;
        color: #3a8ee6;
        font-size: 15px;
      }
    }
    .sort{
      height: 100%;
      width: 100px;
      //background: yellow;
      line-height: 50px;
      text-align: center;
    }
    .operate{
      width: 400px;
      height: 100%;
      //background: #00a854;
      line-height: 50px;
      text-align: center;
      .item{
        margin-left: 10px;
        .name{
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
