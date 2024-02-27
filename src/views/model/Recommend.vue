<template>
  <div style="margin-bottom: 10px">
    <ServeModel :base-url="baseUrl" v-if="list.length > 0" v-for="(item,index) in list" :good="item" :key="index"></ServeModel>

    <el-empty style="margin: 0 auto" v-if="list.length === 0" description="暂无" />
  </div>
</template>
<script>
import ServeModel from './ServeModel.vue';
import { getRecommendList } from '@/api/recommend';

export default {
  name: 'Recommend',
  components: { ServeModel },
  created(){
    if (sessionStorage.getItem('userId') !=null){
      this.query.userId = sessionStorage.getItem('userId');
      this.getData();
    }

  },

  data(){
    return{
      list:[],
      query:{
        pageNum:1,
        pageSize:8
      },
      total:0,
      sortList:[],
      currentKey:0,
      baseUrl:null,
    }
  },

  methods:{
    getData(){
      getRecommendList(this.query).then(res =>{
        this.list =res.data;
        this.baseUrl = res.baseUrl;
      })
    },


    /**
     * 分页(改变页码)
     * @param val
     */
    pageCurrentChange(val){
      this.$set(this.query, 'pageNum', val);
      this.getData();
    },

    /**
     * 分页(改变每页条数)
     * @param val
     */
    pageSizeChange(val){
      this.$set(this.query, 'pageSize', val);
      this.getData();
    },
  }
};
</script>



<style scoped>
.sort{
  width: 100%;
  //height: 60px;
  padding: 10px 200px;
  display: inline-flex;

//padding: 0 ;
  .item{
    width: 120px;
    cursor: pointer;
    height: 100%;
    text-align: center;
    line-height: 40px;
  //background: green;
    margin-left: 10px;
    border-radius: 30px;
    font-size: 14px;
    color: #666666;

    &:hover{
      background: #41b982;
      color: #ffffff;
    }
  }
  .isClick{
    background: #41b982;
    color: #ffffff;
  }
}
</style>
