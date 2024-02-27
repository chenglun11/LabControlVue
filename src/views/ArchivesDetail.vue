
<template>
  <div class="detail">
    <LineInfo title="档案介绍" sub-title="Archives Info"></LineInfo>
    <el-card>
    <div class="top">
      {{detailInfo.title}}
    </div>
    <div class="content">
      <v-md-preview   v-highlight  :text="detailInfo.content" ref="preview" />
    </div>
    </el-card>
    <LineInfo title="档案详情" sub-title="Archives Detail"></LineInfo>
    <el-card>
      <div v-if="detailInfo.type === 1">{{detailInfo.documentUrl}}</div>
      <AudioPlay v-if="detailInfo.type === 2" :audio-url="baseUrl + detailInfo.documentUrl"></AudioPlay>
      <VideoPlay v-if="detailInfo.type === 4" :play-url="baseUrl + detailInfo.documentUrl"></VideoPlay>
      <el-image v-if="detailInfo.type === 3" :src="baseUrl + detailInfo.documentUrl"></el-image>
      <el-button v-if="detailInfo.type !==1" type="primary" style="width: 100%;margin-top: 10px" @click="downLoad(detailInfo)">
        点击下载
        </el-button>
    </el-card>
    <div class="comment">
        <NewComment :commentList="commentList" :total="total" @reloadComment="getCommentTree"/>
    </div>

    <div class="score" @click="addScore">
      {{detailInfo.score}}分
    </div>

    <el-dialog  width="60%" :visible.sync="addOrUpdateVisible" title="评分" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="form"  ref="form" label-width="100px">
        <el-form-item label="分数" prop="name">
          <el-input v-model="form.score" placeholder="分数"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="addOrUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="formSubmitHandle()">确认</el-button>
      </template>
    </el-dialog>

  </div>
</template>
<script>
import { getArchivesList, updateArchivesScoreInfo } from '@/api/archives';
import ServeModel from '@/views/model/ServeModel.vue';
import NewComment from '@/components/operate/NewComment.vue';
import { getCommentTreeInfo } from '@/api/comment';
import LineInfo from '@/views/model/Line.vue';
import AudioPlay from '@/components/media/AudioPlay.vue';
import VideoPlay from '@/components/media/VideoPlay.vue';

import { saveAs as FileSaver } from 'file-saver'
import SingleUpload from '@/components/common/singleUpload.vue';
export default {
  name: 'StrategyDetail',
  components: { SingleUpload, VideoPlay, AudioPlay, LineInfo, NewComment, ServeModel },
  data(){
    return{
      detailInfo:{},
      placeList:[],
      commentList:[],
      total:0,
      query:{
        archivesId:this.$route.query.id
      },
      baseUrl:null,
      form:{},
      addOrUpdateVisible:false,
    }
  },
  created(){
    this.getData();
    this.getCommentTree();
  },
  methods:{
    getData(){
      getArchivesList({id:this.$route.query.id}).then(res =>{
        this.detailInfo = res.data.list[0];
        this.baseUrl = res.baseUrl;
      });
      getRecordList({archivesId:this.$route.query.id}).then(res =>{
        this.placeList = res.data.list;
      });
    },

    getCommentTree(){
      getCommentTreeInfo(this.query).then(res =>{
        this.commentList = res.data.list;
        this.total = res.data.total;
      })
    },

    addScore(){
      this.form = {};
      this.form.id = this.detailInfo.id;
      this.addOrUpdateVisible = true;
    },

    formSubmitHandle(){
      if (this.form.score == null || this.form.score === ''){
        return this.$message.waring('请输入分数')
      }
      if (this.form.score >10){
        return this.$message.warning('分数最高为10分')
      }
      updateArchivesScoreInfo(this.form).then(res =>{
        this.$message.success('评分成功');
        this.addOrUpdateVisible = false;
        this.getData();
      })
    },

    downLoad(detailInfo) {
      console.log(url);
      const url = this.baseUrl + detailInfo.documentUrl;
      const oReq = new XMLHttpRequest()
      const URL= url // URL 为下载的URL地址
      oReq.open('GET', URL, true)
      oReq.responseType = 'blob'
      oReq.onload = function() {
        const file = new Blob([oReq.response], {
          type: 'blob'
        })
        FileSaver.saveAs(file,  detailInfo.documentUrl) // fileName为文件名
      }
      oReq.send()
    },

  }
};
</script>


<style scoped lang="scss">
.detail{
  width: 1170px;
  margin: 10px auto;
  //height: 400px;
  //background: red;
  .top{
    height: 50px;
    width: 100%;
    //background: #00a854;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-weight: 900;
    border-bottom: 1px solid #e8f0e9;
  }


  .place{
    width: 100%;
    //height: 300px;
    padding: 5px;
    //background: red;
  }


  /deep/.vuepress-markdown-body:not(.custom){
    padding: 0 0;
  }
  /deep/ .vuepress-markdown-body h3 {
    font-size: 30px;
  }
  /deep/ .vuepress-markdown-body h2 {
    font-size: 40px;
  }
  /deep/ .vuepress-markdown-body img{
    width: 100%;
    height: 500px;
    text-align: center;
    //margin-left: 200px;
  }
  /deep/ .vuepress-markdown-body p{
    line-height: 40px;
  }
}
.score{
  position: absolute;
  left: 10px;
  top: 300px;
  background: #cc7a00;
  width: 150px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
}
</style>
