<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入实验室名" v-model="query.labName" class="search-input"></el-input>
      <el-button type="success" round class="search-btn" @click="getData">点击搜索</el-button>
      <el-button type="primary" round class="search-btn" @click="reset">点击重置</el-button>
    </div>

    <div class="sort">
      <div class="item" @click="clickSort(item,index)" v-for="(item,index) in sortList" :class="{'isClick':index===currentKey}">
        {{item.sortName}}
      </div>
    </div>
      <el-pagination
          :current-page="query.pageNum"
          :page-sizes="[9, 20, 50, 100]"
          :page-size="query.pageSize"
          :total="total"
          style="margin-top: 10px"
          layout="total, prev, pager, next"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
      </el-pagination>
        <ProductModel v-if="list.length > 0" :indexNumber="index" v-for="(item,index) in list" @reloadModel="getData"  :model="item" :key="index"></ProductModel>


    <el-empty style="margin: 0 auto" v-if="list.length === 0" description="暂无" />

  </div>
</template>
<script>
import { getSortList } from '@/api/sort';
import ProductModel from '@/views/model/ProductModel.vue';
import { getLabList } from '@/api/lab';

export default {
  name: 'IndexServe',
  components: { ProductModel},
  created(){
    this.getData();
    this.getSortList();
  },

  data(){
    return{
      list:[],
      query:{
        pageNum:1,
        pageSize:9,
        labName:null,
        sortName:null,
        authorName:null,
        createPlace:null,
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
      getLabList(this.query).then(res =>{
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
      this.query.labName = null;
      this.query.createPlace = null;
      this.query.authorName = null;
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
  //height:0.9375rem;
  //margin-top: 0.15625rem;
//background: red;
  text-align: center;
  .search-input{
    line-height: 0.9375rem;
    width: 3.90625rem;
    margin-left: 0.3125rem;
  }
  .search-btn{
    width: auto;
    margin-left: 0.3125rem;
    //font-size: 0.1875rem;
  }
}
/deep/ .el-input--small .el-input__inner{
  border-radius: 1.05375rem;
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

    :hover{
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
