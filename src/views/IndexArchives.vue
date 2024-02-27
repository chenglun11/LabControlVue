<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入标题" v-model="query.title" class="search-input"></el-input>
      <el-input placeholder="请输入分类"  v-model="query.sortName" class="search-input"></el-input>
      <el-button type="success" round class="search-btn" @click="getData">点击搜索</el-button>
      <el-button type="primary" round class="search-btn" @click="reset">点击重置</el-button>
    </div>
    <div class="sort">
      <div class="item" @click="clickSort(item,index)" v-for="(item,index) in sortList" :class="{'isClick':index===currentKey}">
        {{item.sortName}}
      </div>
    </div>
<!--    {{list.length > 0}}-->
    <ArticleModel v-if="list.length > 0" :indexNumber="index" v-for="(item,index) in list" @reloadModel="getData"  :model="item" :key="index"></ArticleModel>

    <el-empty style="margin: 0 auto" v-if="list.length === 0" description="暂无" />
    <el-pagination
        :current-page="query.pageNum"
        :page-sizes="[8, 20, 50, 100]"
        :page-size="query.pageSize"
        :total="total"
        style="margin-top: 10px"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import ServeModel from './model/ServeModel.vue';
import { getSortList } from '@/api/sort';
import { getArchivesList} from '@/api/archives';
import ArticleModel from '@/views/model/ArticleModel.vue';

export default {
  name: 'IndexServe',
  components: { Model, ServeModel },
  created(){
    this.getData();
    this.getSortList();
  },

  data(){
    return{
      list:[],
      query:{
        pageNum:1,
        pageSize:8,
        title:null,
        sortName:null,
        address:null
      },
      total:0,
      sortList:[],
      currentKey:0,
      baseUrl:null
    }
  },

  methods:{
    getData(){
      this.query.loginUserId = sessionStorage.getItem('userId')
      getArchivesList(this.query).then(res =>{
        this.list =res.data.list;
        this.total = res.data.total;
      })
    },
    getSortList(){
      getSortList({pageSize:100}).then(res =>{
        this.sortList = res.data.list;
        this.sortList.unshift({
          id:0,
          sortName:'全部'
        })
      })
    },

    clickSort(item,index){
      this.currentKey = index;
      if (item.id !== 0){
        this.query.sortId = item.id;
      }else {
        this.query.sortId = null;
      }
      this.getData();
    },



    /**
     * 分页(改变页码)
     * @param val
     */
    pageCurrentChange(val){
      this.$set(this.query, 'pageNum', val);
      this.getData();
    },
    reset(){
      this.query.pageNum = 1;
      this.query.title = null;
      this.query.address = null;
      this.query.sortName = null;
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
.search{
  width: 100%;
  height: 60px;
//background: red;
  text-align: center;
  .search-input{
    line-height: 60px;
    width: 250px;
    margin-left: 20px;

  }
  .search-btn{
    width: 100px;
    margin-left: 20px;
  }
}
/deep/ .el-input--small .el-input__inner{
  border-radius: 70px;
  box-shadow: #5a5a5a;
}
.sort{
  width: 100%;
  //height: 60px;
  padding: 0.15625rem 3.125rem;
  display: inline-flex;

//padding: 0 ;
  .item{
    width: 1.875rem;
    cursor: pointer;
    height: 100%;
    text-align: center;
    line-height: 0.625rem;
  //background: green;
    margin-left: 0.15625rem;
    border-radius: 0.46875rem;
    font-size: 0.21875rem;
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
